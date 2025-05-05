import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

export class CurtomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig!.path === 'list';
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle,
  ): void {
    this.storedRoutes.set(route.routeConfig!.path!, handle);
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return (window as any).shouldReuse;
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(
      route.routeConfig!.path!,
    ) as DetachedRouteHandle;
  }
}
