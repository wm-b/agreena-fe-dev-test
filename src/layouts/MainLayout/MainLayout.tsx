import s from "./MainLayout.module.css"
import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const MainLayout: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <header>
        <nav>
          <button
            className={
              window.location.pathname.includes("/certificates")
                ? s.selected
                : ""
            }
            onClick={() => navigate("./certificates")}
          >
            Certificates
          </button>
          <button
            className={
              window.location.pathname.includes("/favourites") ? s.selected : ""
            }
            onClick={() => navigate("./favourites")}
          >
            Favourites
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
