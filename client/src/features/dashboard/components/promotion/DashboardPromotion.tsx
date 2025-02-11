import Button from "@/features/shared/components/Button";
import Properties from "@/features/shared/components/Properties";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { convertDate } from "@/utils/convertDate";
import { PromotionType } from "@/utils/types/promotion.type";
import { ReactElement } from "react";

type DashboardPromotionProps = {
  promotion: PromotionType;
};

const DashboardPromotion = ({
  promotion,
}: DashboardPromotionProps): ReactElement => {
  return (
    <div className="w-1/2 my-5 flex flex-col justify-center items-center mx-auto shadow-md rounded-lg py-3">
      <div className="w-1/2 flex justify-between flex-wrap items-center">
        <Properties property="Név" value={promotion.promotionName} />
        {promotion.description && (
          <Properties property="Leírás" value={promotion.description} />
        )}

        <Properties
          property="Kedvezmény"
          value={`${promotion.discountValue} %`}
        />

        <Properties
          property="Akció kezdete"
          value={convertDate(promotion.startDate)}
        />

        <Properties
          property="Akció vége"
          value={convertDate(promotion.endDate)}
        />
        <Properties
          property="Aktív"
          value={promotion.isActive ? "Aktív" : "Inaktív"}
        />

        <div className="flex gap-10 flex-wrap">
          <RedirectButton
            buttonText="Módosít"
            route={`modify/${promotion.promotionId}`}
            redirectTo={location.pathname}
          />

          <Button variant="danger" size="sm">
            Törlés
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPromotion;
