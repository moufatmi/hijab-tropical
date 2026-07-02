'use client'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/15 via-accent/10 to-transparent py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">
            Modest Fashion Inspired by Nature
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Premium hijabs in colors that celebrate the natural world. From sage green to terracotta, each piece is a work of art.
          </p>
          <div className="pt-4">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
              Sustainable &amp; Ethical
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}
