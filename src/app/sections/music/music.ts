import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { LangToggle } from '../../shared/lang-toggle';
import { I18n } from '../../i18n/i18n';

/* ---------- Lo mínimo que usamos de las APIs de YouTube y Spotify ---------- */
interface YtPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
}

interface YtNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      width: string | number;
      height: string | number;
      playerVars: Record<string, number | string>;
      events: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
        onError?: (e: { data: number }) => void;
      };
    },
  ) => YtPlayer;
}

interface SpotifyController {
  play(): void;
  pause(): void;
  restart(): void;
  addListener(event: 'ready', cb: () => void): void;
  addListener(
    event: 'playback_update',
    cb: (e: { data: { isPaused: boolean; duration: number; position: number } }) => void,
  ): void;
  destroy(): void;
}

interface SpotifyIframeApi {
  createController(
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (controller: SpotifyController) => void,
  ): void;
}

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const YT_API = 'https://www.youtube.com/iframe_api';
const SPOTIFY_API = 'https://open.spotify.com/embed/iframe-api/v1';
const YT_PLAYING = 1;
const YT_ENDED = 0;

function loadScript(src: string): void {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Portada de entrada, animación y canción de fondo.
 * Los navegadores no permiten que una página suene sin que la persona toque algo,
 * así que la canción arranca al tocar "Open invitation".
 */
@Component({
  selector: 'app-music',
  imports: [LangToggle],
  templateUrl: './music.html',
  styleUrl: './music.css',
})
export class Music {
  private readonly i18n = inject(I18n);
  protected readonly w = this.i18n.w;
  protected readonly t = this.i18n.t;
  protected readonly introBackground =
    'linear-gradient(rgba(36, 43, 30, 0.72), rgba(36, 43, 30, 0.86)), url(images/hero-movil.jpg)';

  /** 'card' = portada con el botón · 'film' = animación · 'done' = página. */
  protected readonly stage = signal<'card' | 'film' | 'done'>('card');
  protected readonly leaving = signal(false);
  protected readonly videoSrc = signal('');

  protected readonly playing = signal(false);
  protected readonly panel = signal(false);
  protected readonly hint = signal(false);
  /** 'youtube' normalmente; 'spotify' si YouTube no deja insertar el video. */
  protected readonly source = signal<'youtube' | 'spotify'>('youtube');

  private readonly ytEl = viewChild.required<ElementRef<HTMLElement>>('yt');
  private readonly spEl = viewChild.required<ElementRef<HTMLElement>>('sp');

  private yt?: YtPlayer;
  private ytReady = false;
  private spotify?: SpotifyController;
  private spotifyReady = false;
  /** La persona quiere música (tocó play y no pausó). */
  private wanted = false;
  private failTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('is-locked', this.stage() !== 'done');
    });
    afterNextRender(() => this.loadYouTube());
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.failTimer);
      this.yt?.destroy();
      this.spotify?.destroy();
    });
  }

  /** Toque en "Open invitation" o "Enter without music". */
  open(withMusic: boolean): void {
    if (withMusic) this.play();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.finish();
      return;
    }
    const portrait = window.innerHeight > window.innerWidth;
    const suffix = this.i18n.lang() === 'es' ? '-es' : '';
    this.videoSrc.set(`video/intro-${portrait ? 'portrait' : 'landscape'}${suffix}.mp4`);
    this.stage.set('film');
  }

  /** Al terminar (o saltar) la animación, se desvanece y aparece la página. */
  finish(): void {
    if (this.leaving()) return;
    this.leaving.set(true);
    setTimeout(() => {
      this.stage.set('done');
      if (this.wanted && this.source() === 'youtube') this.panel.set(true);
    }, 700);
  }

  toggle(): void {
    if (this.playing()) {
      this.wanted = false;
      if (this.source() === 'youtube') this.yt?.pauseVideo();
      else this.spotify?.pause();
    } else {
      this.play();
    }
  }

  togglePanel(): void {
    this.panel.update((v) => !v);
    this.hint.set(false);
  }

  private play(): void {
    this.wanted = true;
    if (this.source() === 'youtube' && this.ytReady) this.yt?.playVideo();
    if (this.source() === 'spotify' && this.spotifyReady) this.spotify?.play();
    // Si en unos segundos no suena (bloqueo del navegador o sin conexión),
    // mostramos el reproductor para que la persona toque play ahí.
    clearTimeout(this.failTimer);
    this.failTimer = setTimeout(() => {
      if (this.wanted && !this.playing()) {
        this.panel.set(true);
        this.hint.set(true);
      }
    }, 9000);
  }

  /* ---------------- YouTube ---------------- */
  private loadYouTube(): void {
    const create = () => {
      if (!window.YT || this.yt) return;
      this.yt = new window.YT.Player(this.ytEl().nativeElement, {
        videoId: WEDDING.music.youtubeVideoId,
        width: '100%',
        height: '100%',
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, controls: 1 },
        events: {
          onReady: () => {
            this.ytReady = true;
            if (this.wanted && !this.playing()) this.yt?.playVideo();
          },
          onStateChange: ({ data }) => {
            this.playing.set(data === YT_PLAYING);
            if (data === YT_PLAYING) this.hint.set(false);
            // Al terminar, vuelve a empezar.
            if (data === YT_ENDED && this.wanted) {
              this.yt?.seekTo(0, true);
              this.yt?.playVideo();
            }
          },
          // 101/150: el dueño del video no permite insertarlo -> Spotify.
          onError: () => this.useSpotify(),
        },
      });
    };
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      create();
    };
    if (window.YT?.Player) create();
    else loadScript(YT_API);
  }

  /* ---------------- Spotify (respaldo) ---------------- */
  private useSpotify(): void {
    if (this.source() === 'spotify') return;
    this.source.set('spotify');
    this.playing.set(false);
    window.onSpotifyIframeApiReady = (api) => {
      api.createController(
        this.spEl().nativeElement,
        { uri: `spotify:track:${WEDDING.music.spotifyTrackId}`, width: '100%', height: 80 },
        (controller) => {
          this.spotify = controller;
          controller.addListener('ready', () => {
            this.spotifyReady = true;
            if (this.wanted) controller.play();
          });
          controller.addListener('playback_update', ({ data }) => {
            this.playing.set(!data.isPaused);
            if (!data.isPaused) this.hint.set(false);
            const ended = data.duration > 0 && data.position >= data.duration - 800;
            if (this.wanted && data.isPaused && ended) controller.restart();
          });
        },
      );
    };
    loadScript(SPOTIFY_API);
    if (this.wanted) {
      this.panel.set(true);
      this.hint.set(true);
    }
  }
}
