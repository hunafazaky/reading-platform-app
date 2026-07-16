import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    // PaginationNext,
    // PaginationPrevious,
} from "@/components/ui/pagination";

import { Card } from "@/components/ui/card";

interface AppPaginationProps {
    page: number;
    totalPages: number;
}

export function AppPagination({ page, totalPages }: AppPaginationProps) {
    return (
        <Card className="my-4 py-2">
            <Pagination>
                <PaginationContent>
                    {/*<PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>*/}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={page === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {/*<PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>*/}
                    {/*<PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>*/}
                </PaginationContent>
            </Pagination>
        </Card>
    );
}
