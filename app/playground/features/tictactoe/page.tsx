"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function TicTacToePage() {
  

  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/playground">Playground</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Tic-Tac-Toe</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
            <div className="grid grid-cols-3">
             
            </div>
        </div>

    </div>
  );
}
