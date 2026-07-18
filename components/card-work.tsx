"use client";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { useRouter } from "next/navigation";

// Icon
import { PenNibIcon, ArticleIcon, TrashIcon } from "@phosphor-icons/react";

interface Work {
    id: string;
    title: string;
    body: string;
    categories: string[];
}

export function CardWork({ work }: { work: Work }) {
    // console.log(work.id);
    //
    const router = useRouter();
    const handleNavigate = (title: string, id: string) => {
        const cleanedTitle = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        router.push(`/works/${cleanedTitle}-${id}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="truncate">{work.title}</CardTitle>
                {work.categories.length > 0 ? (
                    work.categories.map((category: string, index: number) => (
                        <CardDescription key={index}>
                            {category}
                        </CardDescription>
                    ))
                ) : (
                    <CardDescription>Uncategorized</CardDescription>
                )}
                <CardAction>Save</CardAction>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-3">{work.body}</p>
            </CardContent>
            <CardFooter>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-lime-600"
                    onClick={() => handleNavigate(work.title, work.id)}
                >
                    <ArticleIcon />
                    Read
                </Button>
                <ButtonGroup aria-label="Button group" className="ml-auto">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-amber-400"
                    >
                        <PenNibIcon />
                        Edit
                    </Button>
                    <ButtonGroupSeparator />
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-amber-600"
                    >
                        <TrashIcon />
                        Delete
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}
