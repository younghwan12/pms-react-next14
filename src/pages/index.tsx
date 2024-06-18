import Image from "next/image";
import { Inter } from "next/font/google";
import { DataTable } from "@/common/components";
import { Column } from "primereact/column";

export default function Home() {
    const data = [
        {
            id: 1,
            name: "일영",
        },
        {
            id: 2,
            name: "이영",
        },
        {
            id: 3,
            name: "삼영",
        },
        {
            id: 4,
            name: "삼영",
        },
        {
            id: 5,
            name: "삼영",
        },
        {
            id: 6,
            name: "삼영",
        },
    ];
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <DataTable value={data} rows={5}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </main>
    );
}
