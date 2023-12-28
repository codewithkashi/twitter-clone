import "@styles/globals.css";
import { Sidebar, FollowBar, Header } from "@components";
import { AuthProvider } from "@components/Utils/Clients";
export const metadata = {
  title: "Twitter",
  description: "Connect to the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {" "}
          <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
              <div className="grid grid-cols-4 h-full">
                <Sidebar />
                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-900">
                  {children}
                </div>
                <FollowBar />
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
