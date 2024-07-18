import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK!
        );
        console.log('event', event);
    } catch (error) {
        return new NextResponse("invalid signature", { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        console.log('payment was successful');

        const session = event.data.object as Stripe.Checkout.Session;
        const paymentIntentId = session.payment_intent as string;

        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
                expand: ['charges']
            });

          
            const charges = (paymentIntent as any).charges as Stripe.ApiList<Stripe.Charge>;
            const receiptUrl = charges.data[0]?.receipt_url;

            console.log('Receipt URL:', receiptUrl);

           
            return NextResponse.json({ receiptUrl });
        } catch (error) {
            console.error('Error retrieving payment intent:', error);
            return new NextResponse("Error retrieving payment intent", { status: 500 });
        }
    }

    return new NextResponse("Unhandled event type", { status: 400 });
}
