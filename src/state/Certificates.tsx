import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { Certificate, Certificates, Meta } from "types/Certificates"
import { agreenaAPIRoot } from "utils/constants"
import { debounce } from "utils/misc"

type CertificatesContextType = {
  certificates: Certificate[]
  meta: Meta
  favourites: string[]
  addCertificateToFavourites: (id: string) => void
  removeCertificateFromFavourites: (id: string) => void
  isFavourite: (id: string) => boolean
  page: number
  updatePage: (page: number) => void
  limit: number
  updateLimit: (limit: number) => void
}

const CertificatesContext = createContext<CertificatesContextType>({
  certificates: [],
  meta: {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0
  },
  favourites: [],
  addCertificateToFavourites: () => {},
  removeCertificateFromFavourites: () => {},
  isFavourite: () => false,
  page: 0,
  updatePage: () => {},
  limit: 0,
  updateLimit: () => {}
})

export const useCertificates = () => {
  const context = CertificatesContext
  if (context === undefined)
    throw new Error(
      "useCertificates must be used within a CertificatesProvider"
    )

  return useContext(context)
}

type ProviderProps = {
  children: ReactNode
}

export const CertificatesProvider: FC<ProviderProps> = ({ children }) => {
  const [certificates, setCertificates] = useState<Certificate[]>()
  const [favourites, setFavourites] = useState<string[]>([])
  const [meta, setMeta] = useState<Meta>()
  const [settings, setSettings] = useState({
    page: 1,
    limit: 10
  })

  const getFavourites = () =>
    localStorage.getItem("favourites")
      ? setFavourites(JSON.parse(localStorage.getItem("favourites")!))
      : []

  const saveFavourites = (favourites: string[]) => {
    localStorage.setItem("favourites", JSON.stringify(favourites))
    getFavourites()
  }

  const fetchCertificates = useCallback(
    async () =>
      fetch(
        `${agreenaAPIRoot}/certificates?includeMeta=true&page=${settings.page}&limit=${settings.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "API-ACCESS-TOKEN": "Commoditrader-React-FE-Farmer"
          }
        }
      )
        .then(async (response) => {
          const json: Certificates = await response.json()
          if (!json.success) throw new Error(json?.errors.join(", "))
          return json
        })
        .catch((error) => {
          throw new Error(error)
        }),
    [settings.limit, settings.page]
  )

  const getCertificates = useCallback(async () => {
    const { result } = await fetchCertificates()

    setCertificates(result.data)
    setMeta(result.meta)
  }, [fetchCertificates])

  useEffect(() => {
    getCertificates()
    getFavourites()
  }, [getCertificates])

  const addCertificateToFavourites = (id: string) =>
    saveFavourites([...favourites, id])

  const removeCertificateFromFavourites = (id: string) =>
    saveFavourites(favourites.filter((item) => item !== id))

  const isFavourite = (id: string) => favourites.includes(id)

  const updatePage = debounce(
    (page: number) => setSettings((prev) => ({ ...prev, page })),
    500
  )

  const updateLimit = debounce(
    (limit: number) => setSettings((prev) => ({ ...prev, limit })),
    500
  )

  if (!certificates || !meta) return null

  return (
    <CertificatesContext.Provider
      value={{
        certificates,
        meta,
        favourites,
        addCertificateToFavourites,
        removeCertificateFromFavourites,
        isFavourite,
        page: settings.page,
        updatePage,
        limit: settings.limit,
        updateLimit
      }}
    >
      {children}
    </CertificatesContext.Provider>
  )
}
