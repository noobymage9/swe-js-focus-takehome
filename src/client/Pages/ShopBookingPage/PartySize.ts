import { MenuItem, Shop } from "../../../types";

export class PartySize {
  private shop: Shop;

  private menu: MenuItem[];

  constructor(shop: Shop, menu: MenuItem[]) {
    this.shop = shop;
    this.menu = menu;
  }

  public getShop() {
    return this.shop;
  }

  public getMenu() {
    return this.menu;
  }
}
