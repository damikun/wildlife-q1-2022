
type LayoutProps = {
  children: React.ReactNode
};

export default function LayoutProvider({children}:LayoutProps){
  return <>
    {children}
  </>
}
