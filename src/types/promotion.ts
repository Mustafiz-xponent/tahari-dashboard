export enum PromoTargetType {
  PRODUCT = "PRODUCT",
  DEAL = "DEAL",
  PREORDER = "PREORDER",
  SUBSCRIPTION_PLAN = "SUBSCRIPTION_PLAN",
}
export enum PromoPlacement {
  HOME_TOP = "HOME_TOP",
  HOME_BOTTOM = "HOME_BOTTOM",
  HOME_MIDDLE = "HOME_MIDDLE",
}

export interface Promotion {
  promotionId: string;
  title: string;
  description: string;
  targetType: PromoTargetType;
  productId: string;
  dealId: string;
  placement: PromoPlacement;
  priority: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  accessibleImageUrl: string;
}
