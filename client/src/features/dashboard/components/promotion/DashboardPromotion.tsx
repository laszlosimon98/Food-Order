import { useDeletePromotionMutation } from "@/features/promotion/api/promotionApi";
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
  const [useDeletePromotion] = useDeletePromotionMutation();

  const handleDelete = async (id: number) => {
    await useDeletePromotion({ id });
  };

  return (
    <div className="w-1/2 my-5 flex flex-col justify-center items-center mx-auto shadow-md rounded-lg py-3">
      <div className="w-2/3 flex justify-between flex-wrap items-center">
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

        <div className="w-full flex justify-end my-5 flex-wrap">
          <Button
            variant="danger"
            onClick={() => handleDelete(promotion.promotionId)}
          >
            Törlés
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPromotion;
