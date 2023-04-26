import MarkersSidebar from "../MarkersSidebar"
import { Category } from "../../types/Category"
import RoutesSidebar from "../RoutesSidebar"
import { Popups, SidebarView } from "../../pages/MapPage"
import { SidebarSection } from "./Styles"

type Props = {
  isOpen: boolean
  view: SidebarView
  toggleSidebar: (open?: boolean) => void
  selectedCategory: Category
  setSelectedCategory: (category: Category) => void
  setAddRoute: (addRouteF: (name: string, description?: string) => void) => void
  openPopup: (popup : Popups) => void
}

const Sidebar = ({ isOpen, view, toggleSidebar, selectedCategory, setSelectedCategory, setAddRoute, openPopup } : Props) => {

  return (
    <>
    {
      isOpen ?
      <SidebarSection>
        {
          view === SidebarView.MARKERS && <MarkersSidebar toggleSidebar={toggleSidebar} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> 
        }
        {
          view === SidebarView.ROUTES && <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={setAddRoute} openPopup={openPopup}/> 
        }
      </SidebarSection>
      : null
    }
    </>
  )

}

export default Sidebar