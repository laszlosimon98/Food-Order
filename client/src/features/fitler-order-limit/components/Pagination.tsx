import { setPage } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import Button from "@/features/shared/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type PaginationProps = {
  pageButtonCount: number;
};

const Pagination = ({ pageButtonCount }: PaginationProps): ReactElement => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filter.data.page);

  return (
    <div className="w-full mt-2 pb-6 flex justify-center items-center">
      <Button
        variant="secondary"
        onClick={() => {
          if ((page as number) > 1) {
            dispatch(setPage((page as number) - 1));
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </Button>
      {Array(pageButtonCount)
        .fill("")
        .map((_count, index) => (
          <Button
            key={index + 1}
            variant={`${
              index + 1 === page || (!page && index + 1 === 1)
                ? "primary"
                : "secondary"
            }`}
            size="icon"
            className="ml-2"
            onClick={() => dispatch(setPage(index + 1))}
          >
            {index + 1}
          </Button>
        ))}
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => {
          if ((page as number) < pageButtonCount) {
            dispatch(setPage((page as number) + 1));
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
      </Button>
    </div>
  );
};

export default Pagination;
