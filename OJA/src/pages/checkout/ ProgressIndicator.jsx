export default function  ProgressIndicator (){

    return(
<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-8">
                    {/*<!-- Step 1: Cart -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-green-600">Cart</span>
                    </div>
                    
                    <div class="w-16 h-0.5 bg-green-500"></div>
                    
                    {/*<!-- Step 2: Checkout -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-bold">2</span>
                        </div>
                        <span class="text-sm font-medium text-primary">Checkout</span>
                    </div>
                    
                    <div class="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    
                   { /*<!-- Step 3: Confirmation -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <span class="text-gray-500 text-sm font-bold">3</span>
                        </div>
                        <span class="text-sm text-gray-500">Confirmation</span>
                    </div>
                </div>
                
                {/*<!-- Continue Shopping Link -->*/}
                <div  class="text-primary hover:underline text-sm font-medium">← Continue Shopping</div>
            </div>
        </div>
    </div>

        )
}