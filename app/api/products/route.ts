import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Updated product collection using the 13 colors from Desktop/colors
const FALLBACK_HIJAB_PRODUCTS = [
  {
    id: '1',
    title: 'Bleu Brume',
    color: 'Bleu Brume',
    price: '45.00',
    description: 'حجاب بلون أزرق ضبابي ناعم، مستوحى من هدوء الطبيعة الصباحية.',
    image: '/hijabs/bleu brume.jpeg',
  },
  {
    id: '2',
    title: 'Bleu Grivé',
    color: 'Bleu Grivé',
    price: '45.00',
    description: 'درجة زاهية ورائعة للأزرق الصافي، مصنوع من قماش الشيفون الفاخر.',
    image: '/hijabs/bleu grivé.jpeg',
  },
  {
    id: '3',
    title: 'Larme de Viri',
    color: 'Larme de Viri',
    price: '45.00',
    description: 'لون أخضر طبيعي ساحر، يربط بين جمال الطبيعة والأناقة اليومية.',
    image: '/hijabs/larme de viri.jpeg',
  },
  {
    id: '4',
    title: 'Marron Satiné',
    color: 'Marron Satiné',
    price: '45.00',
    description: 'بني دافئ ولامع خفيف، يضفي لمسة كلاسيكية فخمة لإطلالتك.',
    image: '/hijabs/marron satiné.jpeg',
  },
  {
    id: '5',
    title: 'Mauve Poudré',
    color: 'Mauve Poudré',
    price: '45.00',
    description: 'لون موف بودرة هادئ، يعطي انطباعاً بالرقة والنعومة.',
    image: '/hijabs/mauve poudré.jpeg',
  },
  {
    id: '6',
    title: 'Miel Chaude',
    color: 'Miel Chaude',
    price: '45.00',
    description: 'لون عسلي دافئ وساحر كأشعة الشمس الذهبية في الغابات.',
    image: '/hijabs/miel chaude.jpeg',
  },
  {
    id: '7',
    title: 'Orange Mandarine',
    color: 'Orange Mandarine',
    price: '45.00',
    description: 'برتقالي زاهٍ مستوحى من دفء حبات المندرين الناضجة في الخريف.',
    image: '/hijabs/orange mandarine.jpeg',
  },
  {
    id: '8',
    title: 'Reflet de Lavandr',
    color: 'Reflet de Lavandr',
    price: '45.00',
    description: 'انعكاس اللافندر الرقيق، نسيج ناعم يحاكي نسمات حقول الخزامى.',
    image: '/hijabs/reflet de lavandr.jpeg',
  },
  {
    id: '9',
    title: 'Rose Bonbon',
    color: 'Rose Bonbon',
    price: '45.00',
    description: 'وردي حلوى مشرق ومبهج، يعزز من طاقة وحيوية مظهرك.',
    image: '/hijabs/rose bonbon.jpeg',
  },
  {
    id: '10',
    title: 'Rose Poudré',
    color: 'Rose Poudré',
    price: '45.00',
    description: 'وردي بودرة خفيف وناعم، مثالي للإطلالات اليومية المريحة والراقية.',
    image: '/hijabs/rose poudré.jpeg',
  },
  {
    id: '11',
    title: 'Rouge Passioné',
    color: 'Rouge Passioné',
    price: '45.00',
    description: 'أحمر شغوف وداكن يعكس الثقة والجاذبية في كل خطوة.',
    image: '/hijabs/rouge passioné.jpeg',
  },
  {
    id: '12',
    title: 'Terracota Eclat',
    color: 'Terracota Eclat',
    price: '45.00',
    description: 'لون الطين المحروق اللامع، يجسد حرارة وحيوية رمال الصحراء والغروب.',
    image: '/hijabs/terracota eclat.jpeg',
  },
  {
    id: '13',
    title: 'Vert Olive Fruit',
    color: 'Vert Olive Fruit',
    price: '45.00',
    description: 'أخضر زيتوني غني ودافئ كأوراق شجر الزيتون المباركة في الطبيعة.',
    image: '/hijabs/vert olive fruit.jpeg',
  },
]

export async function GET() {
  try {
    // Fetch products from Supabase table 'products'
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Supabase query error, falling back to mock data:', error)
      return NextResponse.json({
        products: FALLBACK_HIJAB_PRODUCTS,
        success: true,
        usingFallback: true,
        errorDetails: error.message,
      })
    }

    // If the table exists but is empty, fallback to default collection
    if (!products || products.length === 0) {
      console.info('Supabase products table is empty. Using fallback products.')
      return NextResponse.json({
        products: FALLBACK_HIJAB_PRODUCTS,
        success: true,
        usingFallback: true,
        info: 'Returned mock fallback data',
      })
    }

    // Format products to match frontend expectations
    const formattedProducts = products.map((p: any) => ({
      id: String(p.id),
      title: p.title,
      color: p.color,
      price: typeof p.price === 'number' ? p.price.toFixed(2) : String(p.price),
      description: p.description || '',
      image: p.image,
    }))

    return NextResponse.json({
      products: formattedProducts,
      success: true,
      usingFallback: false,
    })
  } catch (error: any) {
    console.error('API exception in products route, using fallback:', error)
    return NextResponse.json({
      products: FALLBACK_HIJAB_PRODUCTS,
      success: true,
      usingFallback: true,
      errorDetails: error?.message || 'Unknown error',
    })
  }
}
