import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

interface DemoClip {
  src: string;
  label: string;
}

@Component({
  selector: 'app-kitchen-rail',
  standalone: true,
  templateUrl: './kitchen-rail.component.html',
  styleUrl: './kitchen-rail.component.scss'
})
export class KitchenRailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('desktop') private desktop?: ElementRef<HTMLVideoElement>;
  @ViewChild('phone') private phone?: ElementRef<HTMLVideoElement>;

  readonly desktopClips: DemoClip[] = [
    { src: '/assets/media/demo/pos.mp4', label: 'POS' },
    { src: '/assets/media/demo/cocina.mp4', label: 'Cocina' },
    { src: '/assets/media/demo/insumos.mp4', label: 'Insumos' },
    { src: '/assets/media/demo/stock.mp4?v=2', label: 'Stock' },
    { src: '/assets/media/demo/cuentas.mp4', label: 'Cuentas' },
    { src: '/assets/media/demo/reportes.mp4', label: 'Reportes' }
  ];

  readonly phoneClips: DemoClip[] = [
    { src: '/assets/media/demo/dashboard.mp4', label: 'Dashboard' }
  ];

  desktopIndex = 0;
  phoneIndex = 0;

  private observer?: IntersectionObserver;
  private visible = false;
  private reduceMotion = false;

  get desktopClip(): DemoClip {
    return this.desktopClips[this.desktopIndex];
  }

  get phoneClip(): DemoClip {
    return this.phoneClips[this.phoneIndex];
  }

  ngAfterViewInit() {
    this.reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.prepare(this.desktop?.nativeElement);
    this.prepare(this.phone?.nativeElement);

    if (this.reduceMotion) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((entry) => entry.isIntersecting);
        if (this.visible) {
          this.playBoth();
        } else {
          this.pauseBoth();
        }
      },
      { threshold: 0.2 }
    );

    const stage = this.desktop?.nativeElement.closest('.product-stage');
    if (stage) {
      this.observer.observe(stage);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  nextDesktop() {
    this.advance('desktop');
  }

  nextPhone() {
    this.advance('phone');
  }

  private advance(kind: 'desktop' | 'phone') {
    const clips = kind === 'desktop' ? this.desktopClips : this.phoneClips;
    if (clips.length <= 1) {
      const video = kind === 'desktop' ? this.desktop?.nativeElement : this.phone?.nativeElement;
      if (video) {
        video.currentTime = 0;
        this.play(video);
      }
      return;
    }
    if (kind === 'desktop') {
      this.desktopIndex = (this.desktopIndex + 1) % clips.length;
    } else {
      this.phoneIndex = (this.phoneIndex + 1) % clips.length;
    }
  }

  onClipReady(kind: 'desktop' | 'phone') {
    const video = kind === 'desktop' ? this.desktop?.nativeElement : this.phone?.nativeElement;
    this.prepare(video);
    if (this.visible && !this.reduceMotion) {
      video?.play().catch(() => undefined);
    }
  }

  private playBoth() {
    this.play(this.desktop?.nativeElement);
    this.play(this.phone?.nativeElement);
  }

  private pauseBoth() {
    this.desktop?.nativeElement.pause();
    this.phone?.nativeElement.pause();
  }

  private play(video?: HTMLVideoElement) {
    this.prepare(video);
    video?.play().catch(() => undefined);
  }

  private prepare(video?: HTMLVideoElement) {
    if (!video) {
      return;
    }
    video.muted = true;
    video.volume = 0;
    video.defaultMuted = true;
  }
}
