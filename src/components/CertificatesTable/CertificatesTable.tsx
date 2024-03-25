import s from "./CertificatesTable.module.css"
import { FC } from "react"
import { Certificate } from "types/Certificates"
import { mediaServerIcons } from "utils/constants"
import { firstCharToUpperCase } from "utils/misc"
import { useCertificates } from "state/Certificates"

export const CertificatesTable: FC<{ certificates: Certificate[] }> = ({
  certificates
}) => {
  const {
    meta,
    isFavourite,
    addCertificateToFavourites,
    removeCertificateFromFavourites,
    page,
    updatePage,
    limit,
    updateLimit
  } = useCertificates()

  const toggleCertificateFavourite = (id: string) =>
    isFavourite(id)
      ? removeCertificateFromFavourites(id)
      : addCertificateToFavourites(id)

  return (
    <article className={s.container}>
      <header>
        <h5 className={s.id}>UNIQUE ID</h5>
        <h5 className={s.originator}>ORIGINATOR</h5>
        <h5 className={s.originatorCountry}>ORIGINATOR COUNTRY</h5>
        <h5 className={s.owner}>OWNER</h5>
        <h5 className={s.ownerCountry}>OWNER COUNTRY</h5>
        <h5 className={s.status}>STATUS</h5>
      </header>

      <ol>
        {certificates.map((certificate) => (
          <li key={certificate.uniqueNumber}>
            <button
              className={s.id}
              onClick={() =>
                navigator.clipboard.writeText(certificate.uniqueNumber)
              }
            >
              <span>{certificate.uniqueNumber}</span>
              <img alt="" src={`${mediaServerIcons}/copy.svg`} />

              <span className={s.tooltip}>
                Click to copy the certificate ID
              </span>
            </button>

            <div className={s.originator}>
              <span>{certificate.companyName}</span>
            </div>

            <div className={s.originatorCountry}>
              <span>{certificate.countryCode}</span>
            </div>

            <div className={s.owner}>
              <span>
                {
                  certificate.carbonCertificateOwnerAccount.carbonUser.company
                    .name
                }
              </span>
            </div>

            <div className={s.ownerCountry}>
              <span>
                {
                  certificate.carbonCertificateOwnerAccount.carbonUser.company
                    .address.country
                }
              </span>
            </div>

            <div className={s.status}>
              <span>{firstCharToUpperCase(certificate.status)}</span>
            </div>

            <div className={s.favourite}>
              <button
                type="button"
                name="Favourite Button"
                onClick={() =>
                  toggleCertificateFavourite(certificate.uniqueNumber)
                }
              >
                <img
                  className={s.favourite}
                  alt="favourite"
                  src={
                    isFavourite(certificate.uniqueNumber)
                      ? `${mediaServerIcons}/favouriteSolid.svg`
                      : `${mediaServerIcons}/favourite.svg`
                  }
                />

                <span className={s.tooltip}>
                  {isFavourite(certificate.uniqueNumber)
                    ? "Remove from favourites"
                    : "Add to favourites"}
                </span>
              </button>
            </div>
          </li>
        ))}
      </ol>

      <footer>
        <div>
          <span>Showing</span>
          <input
            type="number"
            defaultValue={limit}
            onChange={(e) => updateLimit(Number(e.target.value))}
          />
          <span>
            {limit === 1 ? "record" : "records"} of {meta.totalItems}
          </span>
        </div>

        <div>
          <span>Page</span>
          <input
            type="number"
            defaultValue={page}
            onChange={(e) => updatePage(Number(e.target.value))}
          />
          <span>of {meta.totalPages}</span>
        </div>
      </footer>
    </article>
  )
}
