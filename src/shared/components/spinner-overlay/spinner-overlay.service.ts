import {ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {SpinnerOverlayComponent} from './spinner-overlay.component';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable()
export class SpinnerOverlayService {
  private overlayConfig: OverlayConfig;
  public overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
  }

  // When attaching to a Material component, set the read property of the ViewChild decorator config object to ElementRef
  public open(connectedElement: ElementRef): SpinnerOverlayComponent {
    this.overlayConfig = {
      // Class is located in the general styles
      panelClass: 'overlay-class',
      positionStrategy: this.overlay.position().flexibleConnectedTo(connectedElement)
        // Connect the top left corner of the origin component to the top left of the overlay component
        .withPositions([ { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top'}]),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // Set the overlay size to the origin element (a div) size
      height: connectedElement.nativeElement.clientHeight,
      width: connectedElement.nativeElement.clientWidth
    };

    this.overlayRef = this.overlay.create(this.overlayConfig);
    const spinnerOverlayComponentComponentPortal = new ComponentPortal(SpinnerOverlayComponent);
    return this.overlayRef.attach(spinnerOverlayComponentComponentPortal).instance;
  }

  public close() {
    if (this.overlayRef !== undefined) {
      this.overlayRef.detach();
    }
  }
}
