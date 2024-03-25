import { FC, useEffect } from "react"
import { useCertificates } from "state/Certificates"
import { CertificatesTable } from "components/CertificatesTable"

export const Certificates: FC = () => {
  const { certificates } = useCertificates()

  useEffect(() => {
    document.title = "Certificates"
  }, [])

  return <CertificatesTable certificates={certificates} />
}
