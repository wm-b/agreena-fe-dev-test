import "./App.css"
import { FC, useCallback, useEffect } from "react"
import { CertificatesProvider } from "state/Certificates"
import { Certificates, Favourites } from "features"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { MainLayout } from "layouts/MainLayout"

export const App: FC = () => {
  const setMinEffectiveWidth = useCallback(() => {
    if (!window.visualViewport) return

    if (window.visualViewport.width < 1500) {
      const modifier = window.visualViewport.width / 1500

      document.body.style.transform = `scale(${modifier})`
      document.body.style.width = `calc(100% / ${modifier})`
      document.body.style.height = `calc(100% / ${modifier})`
    } else {
      document.body.style.transform = ""
      document.body.style.width = "100%"
      document.body.style.height = "100%"
    }
  }, [])

  useEffect(() => {
    setMinEffectiveWidth()
    window.removeEventListener("resize", setMinEffectiveWidth)
    window.addEventListener("resize", setMinEffectiveWidth)
    return () => window.removeEventListener("resize", setMinEffectiveWidth)
  }, [setMinEffectiveWidth])

  return (
    <div className="app">
      <BrowserRouter basename="certificates">
        <CertificatesProvider>
          <Routes>
            <Route path="*" element={<MainLayout />}>
              <Route index element={<Navigate to="certificates" />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>
          </Routes>
        </CertificatesProvider>
      </BrowserRouter>
    </div>
  )
}
