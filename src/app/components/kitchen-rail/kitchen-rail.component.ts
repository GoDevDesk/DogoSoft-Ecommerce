import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-kitchen-rail',
  standalone: true,
  templateUrl: './kitchen-rail.component.html',
  styleUrl: './kitchen-rail.component.scss'
})
export class KitchenRailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('demo') private demo?: ElementRef<HTMLVideoElement>;

  private observer?: IntersectionObserver;
  private visible = false;
  private reduceMotion = false;

  ngAfterViewInit() {
    this.reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const video = this.demo?.nativeElement;
    this.prepare(video);

    if (this.reduceMotion) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((entry) => entry.isIntersecting);
        if (this.visible) {
          this.play(video);
        } else {
          video?.pause();
        }
      },
      { threshold: 0.2 }
    );

    const stage = video?.closest('.hero-demo');
    if (stage) {
      this.observer.observe(stage);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  onReady() {
    const video = this.demo?.nativeElement;
    this.prepare(video);
    if (this.visible && !this.reduceMotion) {
      this.play(video);
    }
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
