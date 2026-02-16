import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                New arrivals
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to <span className="text-blue-600">e-mart</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-610">
            Discover a curated collection of premium products. Fast shipping, secure payments, and a seamless shopping experience await you.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/shop"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center gap-2"
            >
              Shop Now <ShoppingBag className="w-4 h-4" />
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-inset ring-gray-900/10">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-base font-semibold text-gray-900">Secure Payments</h3>
                <p className="mt-2 text-sm text-gray-600">All transactions are encrypted and processed through industry-leading payment gateways.</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-inset ring-gray-900/10">
                <Zap className="h-8 w-8 text-amber-500" />
                <h3 className="mt-4 text-base font-semibold text-gray-900">Fast Delivery</h3>
                <p className="mt-2 text-sm text-gray-600">Get your orders delivered to your doorstep within 2-3 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
