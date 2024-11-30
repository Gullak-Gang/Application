"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const BreadCrumbGenerator = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments?.map((segment, index) => (
          <>
            <BreadcrumbSeparator key={segment} className="hidden md:block" />
            <BreadcrumbItem key={segment}>
              <BreadcrumbPage className="capitalize">
                <Link href={`/${segments.slice(0, index + 1).join("/")}`}>{segment}</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbGenerator;
