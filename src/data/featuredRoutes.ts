import type { FeaturedRoute } from "../types/challenges";

export const FEATURED_ROUTES: FeaturedRoute[] = [
  {
    slug: "machu-picchu-trail",
    title: "Machu Picchu Trail",
    distance: "Distance: 26 miles",
    img: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg/960px-Machu_Picchu%2C_Peru_%282018%29.jpg")', // wide pano
  },
  {
    slug: "lake-titicaca-expedition",
    title: "Lake Titicaca Expedition",
    distance: "Distance: 120 miles",
    img: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Alpaca_y_la_isla_Challeca.jpg/500px-Alpaca_y_la_isla_Challeca.jpg")', // shores from Bolivia
  },
  {
    slug: "nazca-lines-flight",
    title: "Nazca Lines Flight",
    distance: "Distance: 300 miles",
    img: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_49.JPG/500px-L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_49.JPG")', // Hummingbird aerial
  },
];