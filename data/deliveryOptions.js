import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { isWeekend } from "../scripts/utils/weekend.js"; 
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function calculateDeliveryDate(deliveryOption) {

     const today = dayjs();
     let counter = deliveryOption.deliveryDays;
     let deliveryDate = today;
            while(counter > 0) {
                if(isWeekend(deliveryDate))
                    {deliveryDate = deliveryDate.add(1,'days');
                }

                else {
                    deliveryDate = deliveryDate.add(1,'days');
                    counter--;
                }
            }
           

            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            return dateString;

}