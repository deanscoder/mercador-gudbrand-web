export default [
  {
    name: 'Novo!',
    href: '#',
    has_child: false
  },
  {
    name: 'Masculino',
    href: '#',
    has_child: true,
    child: [
      {
        name: 'Superior',
        href: '#',
        links: [
          {
            name: 'T-Shirts',
            href: '#'
          },
          {
            name: 'Camisetas',
            href: '#'
          },{
            name: 'Rash Guard',
            href: '#'
          },
          {
            name: 'Hoodies',
            href: '#'
          }
        ]
      },
      {
        name: 'Inferior',
        href: '#',
        links: [
          {
            name: 'Bermudas',
            href: '#'
          },
          {
            name: 'Calças',
            href: '#'
          },
          {
            name: 'Shorts',
            href: '#'
          }
        ]
      },
      {
        name: 'Roupas de baixo',
        href: '#',
        links: [
          {
            name: 'Box',
            href: '#'
          },
          {
            name: 'Brief',
            href: '#'
          },
          {
            name: 'Jockstrap',
            href: '#'
          },
          {
            name: 'Slip',
            href: '#'
          },
          {
            name: 'Tanga',
            href: '#'
          },
        ]
      }
    ],
  },
  {
    name: 'Feminino',
    href: '#',
    has_child: true,
    child: [
      {
        name: 'Superior',
        href: '#',
        links: [
          {
            name: 'Blusas',
            href: '#'
          },
          {
            name: 'Camisetas',
            href: '#'
          },{
            name: 'Cropped',
            href: '#'
          },
          {
            name: 'Hoodies',
            href: '#'
          }
        ]
      },
      {
        name: 'Inferior',
        href: '#',
        links: [
          {
            name: 'Bermudas',
            href: '#'
          },
          {
            name: 'Calças',
            href: '#'
          },
          {
            name: 'Cangas',
            href: '#'
          },
          {
            name: 'Saias',
            href: '#'
          },
          {
            name: 'Shorts',
            href: '#'
          }
        ]
      },
      {
        name: 'Roupas de baixo',
        href: '#',
        links: [
          {
            name: 'Calcinhas',
            href: '#'
          },
          {
            name: 'Cuecas Femininas Brief',
            href: '#'
          },
          {
            name: 'Lingerie',
            href: '#'
          }
        ]
      },{
        name: 'Full Body',
        href: '#',
        links: [
          {
            name: 'Body',
            href: '#'
          },
          {
            name: 'Macaquinho',
            href: '#'
          },
          {
            name: 'Saida de Praia',
            href: '#'
          },
          {
            name: 'Vestidos',
            href: '#'
          }
        ]
      }
    ],
  }
]