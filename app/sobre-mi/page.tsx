import Image from "next/image";
import PhotoModal from "../components/PhotoModal";

export default function SobreMiPage() {
  return (
    <div className="py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h1 className="text-2xl font-bold">Sobre mí</h1>

        {/* Propósito / Misión / Visión */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold">Propósito</h2>
            <p className="mt-2 text-sm text-slate-700">
              Ayudar a personas y familias a registrar, organizar y hacer seguimiento a problemas de servicios públicos
              en Bogotá, con claridad y sin complicaciones.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold">Misión</h2>
            <p className="mt-2 text-sm text-slate-700">
              Defensa real del usuario, acceso a derechos y acompañamiento justo en trámites administrativos, con
              lenguaje sencillo y trato respetuoso.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold">Visión</h2>
            <p className="mt-2 text-sm text-slate-700">
              Comunidades informadas, organizadas y protegidas frente a abusos, con procesos claros y seguimiento
              responsable.
            </p>
          </section>
        </div>

        {/* Tu info personal */}
        <div className="mt-8 grid gap-6 md:grid-cols-[140px_1fr]">
          {/* Foto circular clickable */}
          <div className="flex items-start justify-center md:justify-start">
            <PhotoModal
              title="Foto"
              
              thumb={
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100">
                  <Image
                    src="/Johan.jpeg"
                    alt="Foto de Johan Mauricio Sánchez Gaviria"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              }
              imageSrc="/johan.jpeg"
              imageAlt="Foto de Johan Mauricio Sánchez Gaviria"
            />
          </div>

          <div className="text-slate-800">
            <p className="text-sm leading-6">
              Soy un ciudadano que acompaña a personas y familias cuando tienen problemas con servicios públicos
              (facturación, cortes, reconexiones, alumbrado, basuras, servicio irregular, medidores, entre otros). Mi
              objetivo es que la gente entienda el proceso, reúna evidencias y sepa cómo reclamar de forma ordenada y
              respetuosa.
            </p>

            <p className="mt-3 text-sm leading-6">
              En muchos casos, el mayor problema no es solo el daño o el cobro, sino la falta de información. Aquí busco
              que cada persona se sienta acompañada, con claridad y sin miedo a “equivocarse” al hacer el trámite.
            </p>

            <p className="mt-3 text-sm leading-6">
              Esta iniciativa es comunitaria. Si el proyecto crece, me gustaría recibir voluntarios que apoyen en
              organización de casos, orientación administrativa y difusión responsable.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Lo que SÍ hago</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                  <li>Ayudar a organizar el caso y la evidencia.</li>
                  <li>Explicar el proceso en lenguaje sencillo.</li>
                  <li>Orientar sobre canales de radicación y seguimiento.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Lo que NO hago</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                  <li>No hago cobros por registrar el caso.</li>
                  <li>No prometo resultados “seguros”.</li>
                  <li>No hago política ni proselitismo.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}