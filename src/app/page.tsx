"use client"

import Container from "./components/container";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import Image from "next/image";
import productImage from './../../public/asset/images/admin profile.jpg' 
import { Circle } from "./components/ui/Circle";
import Link from "next/link";
export default function HomePage() {

  return (
    <Container>

      <Card
  id={1}
  title="كريم دوف تجميلي"
  description="للعناية بالجسم 75 مل"
  image={productImage}
  category="العناية بالبشرة"
  price="44.00"
  originalPrice="55.00"
  discount={20}
  stockStatus={2}
  soldOut={false}
/>
<Link href="/product/1">
<Circle
  id={1}
  image={productImage}
  title="كريم دوف تجميلي"
/>
  </Link>

    </Container>
  );
}