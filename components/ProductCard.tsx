import Link from 'next/link';

// This defines what a product looks like
type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      {/* Product Name */}
      <h3 className="font-bold text-lg">{product.name}</h3>

      {/* Category */}
      <p className="text-gray-500 text-sm mb-1">{product.category}</p>

      {/* Price */}
      <p className="text-blue-600 font-bold text-lg">Rs. {product.price}</p>

      {/* View Details Button */}
      <Link href={`/products/${product._id}`}>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </Link>

    </div>
  );
}