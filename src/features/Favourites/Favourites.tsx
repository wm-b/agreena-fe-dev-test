import { FC, useEffect } from "react"
import { useCertificates } from "state/Certificates"
import { CertificatesTable } from "components/CertificatesTable"

export const Favourites: FC = () => {
  const { certificates, favourites } = useCertificates()

  const filteredCertificates = certificates.filter((certificate) =>
    favourites.includes(certificate.uniqueNumber)
  )

  useEffect(() => {
    document.title = "Favourites"
  }, [])

  return <CertificatesTable certificates={filteredCertificates} />
}
