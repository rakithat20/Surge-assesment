import SearchLogo from "../../../src/assets/navlogo/search.png"
import ExploreLogo from "../../../src/assets/navlogo/explore.png"
import ReelsLogo from "../../../src/assets/navlogo/reel.png"
import MessagesLogo from "../../../src/assets/navlogo/message.png"
import NotificationsLogo from "../../../src/assets/navlogo/like.png"
import CreateLogo from "../../../src/assets/navlogo/create.png"
import InstagramLogo from "../../../src/assets/logo/instagram.png"
import InstagramIcon from "../../../src/assets/logo/icon.png"


import { Link } from "react-router-dom"

const LargeNav = () => {
    const sidebarItems = [
        {
          name: "Search",
          link: "/search",
          icon: SearchLogo,
        },
        {
          name: "Explore",
          link: "/explore",
          icon: ExploreLogo,
        },
        {
          name: "Reels",
          link: "/reels",
          icon: ReelsLogo,
        },
        {
          name: "Messages",
          link: "/messages",
          icon: MessagesLogo,
        },
        {
          name: "Notifications",
          link: "/notifications",
          icon: NotificationsLogo,
        },
        {
          name: "Create",
          link: "/create",
          icon: CreateLogo,
        },
      ];
  return (
    <div className="w-full h-full relative">
        <Link to='/' className="mb-10 px-2 lg:block md:hidden sm:hidden hidden ">
            <img src={InstagramLogo} alt="instagram logo" className="img w-28 h-auto"></img>
        </Link>
    </div>
  )
}

export default LargeNav