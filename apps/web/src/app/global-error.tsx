"use client";

import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="p-8">
        <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>

        <div className="mt-4">
          <p className="font-semibold">Error Message:</p>
          <pre className="bg-red-100 text-red-800 p-2 rounded overflow-auto">{error.message}</pre>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Stack Trace:</p>
          <pre className="bg-gray-100 text-gray-800 p-2 rounded overflow-auto text-sm whitespace-pre-wrap">
            {error.stack}
          </pre>
        </div>
      </body>
    </html>
  );
}
