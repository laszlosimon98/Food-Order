import DashboardPromotion from "@/features/dashboard/components/promotion/DashboardPromotion";
import { useGetPromotionsQuery } from "@/features/promotion/api/promotionApi";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

const DashboardPromotions = (): ReactElement => {
  const location = useLocation();
  const { data: promotions, isLoading } = useGetPromotionsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center gap-20">
        <h1 className="text-2xl font-bold">Akciók</h1>

        <RedirectButton
          buttonText="Új akció"
          route="create"
          redirectTo={location.pathname}
        />
      </div>

      {promotions &&
        promotions.map((promotion) => (
          <DashboardPromotion
            key={promotion.promotionId}
            promotion={promotion}
          />
        ))}
    </div>
  );
};

export default DashboardPromotions;
