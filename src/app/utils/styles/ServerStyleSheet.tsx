"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "@/app/stitches.config";

export function ServerStylesheet({ children }: { children: any }) {
  useServerInsertedHTML(() => {
    return (
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    );
  });

  return children;
}
