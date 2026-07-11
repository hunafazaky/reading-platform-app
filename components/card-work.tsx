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
    ButtonGroupText,
} from "@/components/ui/button-group";

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
    return (
        <Card>
            <CardHeader>
                <CardTitle>{work.title}</CardTitle>
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
                {/*<p>Card Footer</p>*/}
                <Button size="sm" variant="ghost" className="text-lime-600">
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
