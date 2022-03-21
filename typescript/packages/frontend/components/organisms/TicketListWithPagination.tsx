import React, { useMemo, useState } from "react";

import { css } from "@emotion/react";
import { Pagination, PaginationProps, Segment } from "semantic-ui-react";

import { TicketList } from "@/components/molecules/TicketList";
import { SortKey, SortOrder, useGetTicketListQuery } from "@/graphql/generated";

const take = 20;

type Props = {
  sortKey: SortKey;
};

export const TicketListWithPagination: React.VFC<Props> = (props) => {
  const { sortKey } = props;

  const [activePage, setActivePage] = useState(1);

  const { data, refetch } = useGetTicketListQuery({
    variables: {
      ticketListInput: {
        sortKey,
        sortOrder: SortOrder.Desc,
        take,
        page: activePage,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const totalPages = useMemo(
    () => (data?.getTicketList !== undefined ? Math.ceil(data.getTicketList.totalCount / take) : 1),
    [data?.getTicketList],
  );

  const handlePageChange = React.useCallback(
    async (event: React.MouseEvent, data: PaginationProps) => {
      const page = data.activePage;
      if (typeof page === "number") {
        await refetch({
          ticketListInput: {
            sortKey,
            sortOrder: SortOrder.Desc,
            take,
            page,
          },
        });
        setActivePage(page);
      }
    },
    [refetch, sortKey],
  );

  return (
    <>
      {data?.getTicketList !== undefined && (
        <Segment>
          <TicketList tickets={data.getTicketList.tickets} />

          <Pagination
            css={css`
              &&& {
                width: 100%;
                margin-top: 10px;
                overflow-x: auto;
                > a {
                  flex-grow: 1;
                  display: flex;
                  justify-content: center;
                }
              }
            `}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Segment>
      )}
    </>
  );
};
