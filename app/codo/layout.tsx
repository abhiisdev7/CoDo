import { CodoDbBootstrap } from "@/components/codo/codo-db-bootstrap"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CodoDbBootstrap>{children}</CodoDbBootstrap>
}
