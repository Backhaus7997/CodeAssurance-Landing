'use client';

import ClutchWidget from '@/components/ui/ClutchWidget';

export default function FooterEs() {
  return (
    <footer className="relative py-16 px-6 lg:px-16 xl:px-24 border-t border-white/10">
      <div className="w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Clutch Widget Section */}
        <div
          className="flex flex-col items-center"
          style={{ width: '100%', maxWidth: '1280px', marginBottom: '48px' }}
        >
          <p className="text-xs tracking-[0.6em] uppercase text-accent mb-6 font-mono">
            Confían en nosotros
          </p>
        </div>

        {/* Footer Content */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center"
          style={{ width: '100%', maxWidth: '1280px' }}
        >
          {/* Company Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">CODE ASSURANCE</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Excelencia de ingeniería con control de calidad obsesivo
            </p>

            <div className="flex mt-4" style={{ transform: 'translateX(80px)' }}>
              <ClutchWidget
                clutchCompanyId="2606011"
                widgetType="1"
                height="40"
                nofollow={true}
                expandIframe={true}
                scale="100"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>martin.backhaus@code-assurance.com</p>
              <p>+54 9 351 268 2001</p>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Quality Check</li>
              <li>Quality Booster</li>
              <li>Quality Squad</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-sm text-gray-600"
          style={{ width: '100%', maxWidth: '1280px' }}
        >
          <p>&copy; {new Date().getFullYear()} Code Assurance. Todos los derechos reservados.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Términos del servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}