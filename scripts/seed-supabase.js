const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Parse .env.local file to get Supabase credentials
const envPath = path.join(__dirname, '../.env.local')
let envConfig = {}
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const parts = line.split('=')
    if (parts.length >= 2) {
      const key = parts[0].trim()
      const val = parts.slice(1).join('=').trim()
      envConfig[key] = val
    }
  })
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local'
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const newProducts = [
  {
    title: 'Bleu Brume',
    color: 'Bleu Brume',
    price: 45.0,
    description:
      'حجاب بلون أزرق ضبابي ناعم، مستوحى من هدوء الطبيعة الصباحية.',
    image: '/hijabs/bleu brume.jpeg',
  },
  {
    title: 'Bleu Grivé',
    color: 'Bleu Grivé',
    price: 45.0,
    description:
      'درجة زاهية ورائعة للأزرق الصافي، مصنوع من قماش الشيفون الفاخر.',
    image: '/hijabs/bleu grivé.jpeg',
  },
  {
    title: 'Larme de Viri',
    color: 'Larme de Viri',
    price: 45.0,
    description:
      'لون أخضر طبيعي ساحر، يربط بين جمال الطبيعة والأناقة اليومية.',
    image: '/hijabs/larme de viri.jpeg',
  },
  {
    title: 'Marron Satiné',
    color: 'Marron Satiné',
    price: 45.0,
    description:
      'بني دافئ ولامع خفيف، يضفي لمسة كلاسيكية فخمة لإطلالتك.',
    image: '/hijabs/marron satiné.jpeg',
  },
  {
    title: 'Mauve Poudré',
    color: 'Mauve Poudré',
    price: 45.0,
    description: 'لون موف بودرة هادئ، يعطي انطباعاً بالرقة والنعومة.',
    image: '/hijabs/mauve poudré.jpeg',
  },
  {
    title: 'Miel Chaude',
    color: 'Miel Chaude',
    price: 45.0,
    description: 'لون عسلي دافئ وساحر كأشعة الشمس الذهبية في الغابات.',
    image: '/hijabs/miel chaude.jpeg',
  },
  {
    title: 'Orange Mandarine',
    color: 'Orange Mandarine',
    price: 45.0,
    description:
      'برتقالي زاهٍ مستوحى من دفء حبات المندرين الناضجة في الخريف.',
    image: '/hijabs/orange mandarine.jpeg',
  },
  {
    title: 'Reflet de Lavandr',
    color: 'Reflet de Lavandr',
    price: 45.0,
    description:
      'انعكاس اللافندر الرقيق، نسيج ناعم يحاكي نسمات حقول الخزامى.',
    image: '/hijabs/reflet de lavandr.jpeg',
  },
  {
    title: 'Rose Bonbon',
    color: 'Rose Bonbon',
    price: 45.0,
    description: 'وردي حلوى مشرق ومبهج، يعزز من طاقة وحيوية مظهرك.',
    image: '/hijabs/rose bonbon.jpeg',
  },
  {
    title: 'Rose Poudré',
    color: 'Rose Poudré',
    price: 45.0,
    description:
      'وردي بودرة خفيف وناعم، مثالي للإطلالات اليومية المريحة والراقية.',
    image: '/hijabs/rose poudré.jpeg',
  },
  {
    title: 'Rouge Passioné',
    color: 'Rouge Passioné',
    price: 45.0,
    description: 'أحمر شغوف وداكن يعكس الثقة والجاذبية في كل خطوة.',
    image: '/hijabs/rouge passioné.jpeg',
  },
  {
    title: 'Terracota Eclat',
    color: 'Terracota Eclat',
    price: 45.0,
    description:
      'لون الطين المحروق اللامع، يجسد حرارة وحيوية رمال الصحراء والغروب.',
    image: '/hijabs/terracota eclat.jpeg',
  },
  {
    title: 'Vert Olive Fruit',
    color: 'Vert Olive Fruit',
    price: 45.0,
    description:
      'أخضر زيتوني غني ودافئ كأوراق شجر الزيتون المباركة في الطبيعة.',
    image: '/hijabs/vert olive fruit.jpeg',
  },
]

async function seed() {
  console.log('Seeding products to Supabase...')

  const { data, error } = await supabase.from('products').insert(newProducts)

  if (error) {
    console.error('Error inserting products:', error.message)
    console.log(
      '\nTIP: Make sure you created the "products" table in Supabase and enabled a Row Level Security (RLS) policy that allows Insertions, OR write them via SQL editor on Supabase.'
    )
    process.exit(1)
  }

  console.log('Successfully seeded 13 products to Supabase!')
}

seed()
