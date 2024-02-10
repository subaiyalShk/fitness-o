import React, {useState, createContext, useEffect} from 'react';
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { getAuth } from "firebase/auth";

export const AppCTX = createContext();

export const AppData = (props) => {
    const [menu, setMenu] = useState(MenuData);
    const [mealPlan, setMealPlan] = useState(MealPlan)
    const [selectedDay, setSelectedDay] = useState(0)
    const [workouts, setWorkouts] = useState([])
    const [editingMode, setEditingMode] = useState(false)

    useEffect( async () =>{
        getMenu()
        getWorkouts()
    },[])

    const getUser = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);   
        return docSnap.data()
    }

    const getMenu = async () => {
        let res = []
        const menuBook = await getDocs(collection(db, "RecipieBook"));
        menuBook.forEach((doc) => {
            res.push({...doc.data(), id:doc.id });
        });
        console.log('menuBook', res);
        setMenu(res)
    }

    // ----- Adding and deleting meals from the menu
    const createMeal = async (payload, time, itemName) => {
        console.log('ADDING MEAL', {payload, time, itemName})
        try{
            await setDoc(doc(db, time, itemName), payload);
        }catch(err){
            console.warn(err)
        }
        getMenu()
    }

    const deleteMeal = (meal, time) => {
        
    }
    // ----------------------------------

    // Creating a meal plan for the week
    const createPlan = (newPlan) => {
        console.log('From appData', newPlan)
        setMealPlan(newPlan)
    }
    // ----------------------------------

    // Get groccery list
    const getGroccerylist = () =>{

    }

    const getWorkouts = async () => {
        const workouts = []
        let querySnapshot = await getDocs(collection(db, "Workouts"));
        querySnapshot.forEach((doc) => {
            console.log({...doc.data(), id:doc.id })
            workouts.push({...doc.data(), id:doc.id });
        });
        setWorkouts(workouts)
    }

    const saveWorkouts = async (newData) => {
        console.log('new Data Collection', newData)
        // loop through newData 
        for (let index in newData) {
            // if object has no id 
            console.log('data',newData[index])
            if (newData[index].status === 'new'){
                // add new workout to collection called Workouts
                delete newData[index].status
                console.log('data added', newData[index])
                addDoc(collection(db, "Workouts"), newData[index])
            }else if (newData[index].status === 'changed'){
                // update existing document in collection called Workouts
                let idx= newData[index].id
                delete newData[index].status
                delete newData[index].id
                console.log('changed Data', newData[index])
                await setDoc(doc(db, "Workouts", idx), newData[index]);
            }else if (newData[index].status === 'delete'){
                // delete existing document in collection called Workouts
                deleteDoc(doc(db, "Workouts", newData[index].id))
            }
        }
        getWorkouts()
    }

    const saveMealPlan = async (newData) => {
        // loop through newData 
        for (let index in newData) {
            // if object has no id 
            console.log('data', newData[index])
            if (newData[index].status === 'new'){
                // add new workout to collection called Workouts
                delete newData[index].status
                console.log('data added', newData[index])
                addDoc(collection(db, "RecipieBook"), newData[index])
            }else if (newData[index].status === 'changed'){
                // update existing document in collection called Workouts
                let idx= newData[index].id
                delete newData[index].status
                delete newData[index].id
                console.log('changed Data', newData[index])
                await setDoc(doc(db, "RecipieBook", idx), newData[index]);
            }else if (newData[index].status === 'delete'){
                // delete existing document in collection called Workouts
                deleteDoc(doc(db, "RecipieBook", newData[index].id))
            }
        }
        getMenu()
    }

    
    return(
        <AppCTX.Provider value={{ 
            menu, 
            mealPlan, 
            createPlan, 
            deleteMeal, 
            createMeal, 
            getGroccerylist, 
            getUser, 
            selectedDay, 
            setSelectedDay, 
            workouts, 
            setWorkouts,
            editingMode, 
            setEditingMode,
            saveWorkouts,
            saveMealPlan
        }}>
            { props.children }
        </AppCTX.Provider>
    );
}

const MealPlan = {
    Monday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Tuesday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Wednesday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Thursday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Friday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Saturday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    },
    Sunday:{
        breakfast:'none',
        lunch:'none',
        dinner:'none'
    }
}

const MenuData = {
    breakfast:[
        {
            primary: 'Egg White Omlette',
            secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
            person: '/static/images/avatar/5.jpg',
            ingredients:[
                {'egg whites' : '3/4 cups'}, 
                {'spinach' : 'handful'},
                {'sweet potato' : '3/4 cups'},
                {'cinnamon' : 'dash'},
                {'stevia' : '2 packs'}
            ],
            description: "Place sweet potato in microwavable bowl, and poke Holes in slices with fork, proceed to spray with pam and place in microwave under ‘potato’ setting (count = 1 potato). Bring skillet greased with pam to medium heat and Sautee spinach sprayed with pam as well once spinach cooked - add the egg whites a top. Flip about halfway through and continue to heat until cooked through Remove from heat and top with pico de gallo. Top your sweet potato fries with cinnamon & 2 stevia packets."
        },
        {
            primary: 'Savoury Turkey Bake',
            secondary: `Do you have a suggestion for a good present for John on his work
                anniversary. I am really confused & would love your thoughts on it.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'Ground Turkey':'3oz'},
                {'Egg whites': '3'},
                {'broccoli': '1 cup'},
                {'oats': '0.5 cup'},
                {'garlic salt': 'dash'}
            ],
            description:'Combine ALL ingredients in medium mixing bowl and whisk using a single serving size oven friendly dish (or two muffin tins) pour the mixture in and place in oven preheated to 350 degrees Farenheit. Bake for 8-10 minutes, remove and serve with your choice of hot sauce or seasoning.',
        },
        {
            primary: 'Overnight Blue Berry Oats',
            secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
            person: '/static/images/avatar/2.jpg',
            ingredients: [
                {'greek yougurt': '1.5 cup'},
                {'oats': '0.25 cup'},
                {'berries':'0.25 cup'},
                {'vanilla extract': '1 tsp'},
                {'stevia': '2 packs'}
            ],
            description: "Mix Greek Yogurt with vanilla and stevia in one bowl. In separate bowl, microwave oats with water until cooked In overnight jar, put oatmeal at the bottom, then add your frozen berries & finally top with your greek yogurt. Served with one side veggie."

        },
        {
            primary: 'Guilt Free French Toast',
            secondary: 'I have the tickets to the ReactConf for this year.',
            person: '/static/images/avatar/3.jpg',
            ingredients: [
                {'Ezekiel bread': '2 slices'},
                {'egg whites': '0.75 cup'},
                {'vanilla extract': '1 tsp'},
                {'cinnamon': 'dash'},
                {'salt':'dash'},
                {'honey': '1 tsp'}
            ],
            description: "Lightly toast bread in toaster oven. Mix egg whites with vanilla, cinnamon & salt in large shallow bowl. Soak bread slices in egg mixture, once soaked place on skillet at medium heat greased with pam. Flip toast until eggs thoroughly cooked and remove from heat. Top with Walden Farms Pancake Syrup."
        },
        {
            primary: "Egg White McMuffins",
            secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
            person: '/static/images/avatar/4.jpg',
            ingredients:[
                {'Egg whites':'0.75 cup'},
                {'Leafy veggie': '1'},
                {'Solid veggie':'1'},
                {'Oat meal': '0.5 cup'},
                {'Baking powder': '1 tsp'},
                {'Salt': 'dash'}
            ],
            description:"Preheat oven to 350 degrees Farenheit. Mix ALL ingredients in single bowl, and then portion evenly into 2-3 muffin tins. Bake for 10-12 minutes until cooked through center Remove from oven and top with sauce of choice."
        },
        {
            primary: 'Savoury Breakfast Oats',
            secondary: `Menus that are generated by the bottom app bar (such as a bottom
                navigation drawer or overflow menu) open as bottom sheets at a higher elevation
                than the bar.`,
            person: '/static/images/avatar/5.jpg',
            ingredients:[
                {'Oat meal': '0.5 cup'},
                {'Ground Turkey':'6 oz'},
                {'spinach': 'handful'},
                {'water': '0.5 cup'},
                {'balsamic vinegar': 'drizzle'}
            ],
            directions: "Grease skillet with pam and bring to low-medium heat – add ground turkey. Once turkey is about 1⁄2 way cooked, drizzle balsamic vinegar atop and then add oats and water. Continue to cook until turkey is done and mixture becomes thick and sticks together before you add the spinach and drizzle balsamic vinegar again. Remove from heat after spinach shrivels and then top with garlic salt to taste."
        },
        {
            primary: 'Cauliflower Breakfast Pizza',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'cauliflower': '1 cup'},
                {'Egg whites': '0.75 cup'},
                {'oats': '0.5 cup'},
                {'tomato': 'half'},
                {'Oregano': 'dash'},
                {'salt': 'dash'}
            ],
            directions: "Add about 1⁄4 cup water to cauliflower – use steam-friendly container and cook for about 5 minutes at medium power until soft. Mix cooked cauliflower, ground oats, eggs & oregano/salt in bowl. Heat skillet to medium heat, grease with pam, then add egg mixture and bring to medium-low heat, placing lid on top to trap steam. Wait about 4-5 minutes then flip mixture and cook until firm. Remove from heat and top with sliced tomato plus seasoning of choice."
        },
        {
            primary: 'Blueberry Cheese cake bowl',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'cottage cheese': '0.75 cup'},
                {'vanilla protien': '0.5 scoop'},
                {'berries': '0.75 cup'},
                {'stevia': '2 packets'},

            ],
            directions:"Puree cottage cheese with protein powder and stevia in food processor, then add in frozen berries and serve immediately or for a thicker consistency place in freezer for 10-15 minutes."
        },
        {
            primary: 'Protien Pancakes',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'oatmeal': '0.5 cup'},
                {'cottage cheese': '0.5 cup'},
                {'egg whites': '0.75 cup'},
                {'stevia': '2 packets'},
                {'cinnamon': 'dash'},
                {'honey':'1 tsp'}
            ],
            directions:"Grease skillet with pam and bring to medium heat. Mix ALL ingredients together in bowl (or puree in food processor) Cook on skillet for about 2 minutes, then flip and leave on heat until firm. Top with Walden Farms Pancake Syrup or cinnamon and Stevia."
        },
        {
            primary: 'Ultimate Breakfast sandwich',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'Ezekiel bread': '2 slices'},
                {'spinach': '1 cup'},
                {'tomato': 'half'},
                {'eggwhite':'1.25 cup'}
            ],
            directions:"Place bread in toaster at desired level. Heat skillet to low-medium heat, grease with pam, and sautee spinach in pan with balsamic vinegar until it shrinks, then add your egg whites and cook until firm. Put eggs on toast when done and add tomato plus desired sauce (we like siracha on this one)."
        },
        {
            primary: 'Sweet egg scramble',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'eggwhite':'0.75 cup'},
                {'vanilla protien':'0.5 scoop'},
                {'berries': '0.75 cup'},
                {'stevia': '2 packs'},
                {'vanilla extract': '0.25 tsp'},
                {'honey': '1 tsp'},
                {'cinnamon': 'dash'}
            ],
            directions: " Grease skillet with pam and bring to  medium heat. Whisk egg whites, protein, and extras  together in bowl then pour onto skillet  Once eggs are about halfway cooked, add  the berries to the skillet and continue to cook (scrambling thoroughly) until eggs are fully "

        },
    ],
    lunch:[
        {
            primary: 'Garlic Shrimp',
            secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
            person: '/static/images/avatar/5.jpg',
            ingredients:[
                {'shrimp': '6oz'},
                {'salt': '0.5 tsp'},
                {'minced garlic': '2 tsp'},
                {'tomato': '1'},
                {'dried basil': 'dash'},
                {'white rice': '0.5 cup'}
            ],
            directions:"In medium sized bowl, combine the salt, garlic, tomato, vinegar & basil. Toss the shrimp in the mixture and thoroughly coat. Heat skillet greased with pam to medium heat and pour mixture on skillet. Cook until shrimp is fully colored then remove from heat and lay atop 1⁄2 cup of white rice."
        },
        {
            primary: 'Turkey Tacos',
            secondary: `Do you have a suggestion for a good present for John on his work
                anniversary. I am really confused & would love your thoughts on it.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'lean ground turkey': '6 oz'},
                {'romaine letuce': '4 leafs'},
                {'pico de gallo': '0.5 cup'},
                {'white rice': '0.5 cup'},
                {'garlic powder': '0.5 tsp'},
                {'cayenne pepper': '0.25 tsp'},
                {'onion powder': '1 tsp'},
                {'chilli powder': '1.5 tsp'},
            ],
            directions: "Heat skillet to medium-high heat (greased with pam) and sautee turkey with all of the spices listed above until meat is fully cooked. Once cooked, add in the pico de gallo and continue to sautee, until thoroughly mixed. Remove from heat and add to 1⁄2 cup of rice. Evenly distribute between your lettuce ‘shells’ and top with hot sauce of choice if desired."
        },
        {
            primary: 'Chicken Veg Stir Fry',
            secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
            person: '/static/images/avatar/2.jpg',
            ingredients:[
                {'chicken breast':'6 oz'},
                {'brown rice': '0.5 cup'},
                {'snap peas': '0.5 cup'},
                {'broccoli': '0.5 cup'},
                {'Braggs liquid aminos': 'drizzle'},
                {'garlic powder': '1 tsp'},
                {'Onion powder': '1 tsp'},
                {'Red pepper flakes': 'dash'}
            ],
            directions:" Chop veggies into smaller pieces and sautee in skillet at medium heat in Bragg’s AA, garlic powder, onion powder & red pepper flakes. Once thoroughly sautéed (about 3-4 minutes) add ‘shredded’ chicken (torn apart into thin pieces) and rice to pan. Continue to mix so entire dish is coated in seasoning and sauce blend then remove from heat and enjoy with or without added hot sauce."
        },
        {
            primary: 'Sweet Summer Salad',
            secondary: 'I have the tickets to the ReactConf for this year.',
            person: '/static/images/avatar/3.jpg',
            ingredients:[
                {'chicken breast': '6 oz'},
                {'mixed berries': '0.75 cup'},
                {'spinach': '2 cup'},
                {'cherry tomatoes': 'handful'},
            ],
            directions:"In a large bowl – toss spinach, tomatoes, and berries before topping with chicken. Use our Apple Cider Vinegarette for dressing "
        },
        {
            primary: "Loaded Baked Potato",
            secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
            person: '/static/images/avatar/4.jpg',
            ingredients:[
                {'baked potato': '0.75 cups'},
                {'cottage cheese': '6 oz'},
                {'pico de gallo': '0.5 cup'},
                {'green onion': '0.5 cup'},
            ],
            directions: " Bake potato in microwave until cooked through (poking holes with fork helps). Layer on cottage cheese once done, and put under broiler for about 1 minute if you’d prefer the cheese melted. Top with salsa and green onion."
        },
        {
            primary: 'Grilled Tuna Burger',
            secondary: `Menus that are generated by the bottom app bar (such as a bottom
                navigation drawer or overflow menu) open as bottom sheets at a higher elevation
                than the bar.`,
            person: '/static/images/avatar/5.jpg',
            ingredients: [
                {'egg white': '0.2 cup'},
                {'oats': '0.5 cup'},
                {'oregano': '0.25 tsp'},
                {'onion powder': '0.25 tsp'},
                {'garlic powder': '0.25 tsp'},
                {'mixed vegies': '0.5 cup'},
                {'romaine letuce': '2 cups'},
                {'tuna': '1.5 cans'}
            ],
            directions: " Mix together egg white, tuna, oats & spices and form into shape of a burger. Cook on greased pan at a medium heat for about 3 minutes per side until finished. Serve with a side salad of lettuce and veggies along with your choice of dressing."
        },
        {
            primary: 'Chicken Taco',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients: [
                {'chicken breast': '6 oz'},
                {'black refried beans': '0.5 cup'},
                {'green onion': '0.25 cup'},
                {'pico de gallo': '0.5 cup'},
                {'romaine letuce': '4 leafs'},
                {'red pepper flakes': '0.25 tsp'}
            ],
            directions: "Heat beans in a sauce pan on medium-low heat until warm. Proceed to mix in green onion, pico de gallo & red pepper flakes. Remove from heat and evenly distribute into lettuce ‘shells’. Slice chicken into thin strips and top into shells as well. Add salt or sauce to your liking. "
        },
        {
            primary: 'Healthy Fried Rice',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients: [
                {'brown rice': '0.5 cup'},
                {'chicken breast': '3 oz'},
                {'egg whites':'0.25 cup'},
                {'mixed vegies': '1 cup'},
                {'onion powder': '1 tsp'},
                {'chilli powder': '1 tsp'},
                {'braggs liquid aminos': 'drizzle'},
            ],
            directions: "Spray a medium sized skillet with Pam, bring to medium heat and add eggs. Continuously scramble eggs and add in rice and veggies. Shred chicken and add along with spices. Sautee entire mixture in Bragg’s Liquid Aminos, remove from heat and serve."
        },
        {
            primary: 'Quinoa Chicken Salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients: [
                {'Chicken Breast': '6 oz'},
                {'quinoa': '0.5 cups'},
                {'garbanzo beans' : '0.5 cup'},
                {'fresh kale': '1.5 cups'},
                {'red onion': ' 0.25 cups'}
            ],
            directions: "Juice and zest of one lemon 2 tbsp white wine vinegar 1 tsp ground cumin. Salt and pepper to taste. Toss all ingredients together and top with dressing."
        },
        {
            primary: 'Seared White Fish with Cuscous',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'white fish': '6 oz'},
                {'couscous': '0.5 cup'},
                {'minced garlic': '2 tsp'},
                {'cucumber': '1 cup'},
                {'diced red onion': '0.5 cup'},
                {'lemon juice': '2 tsp'},
                {'chopped mint': '2 tsp'}
            ],
            directions: "Add salt and pepper to both sides of white fish and set aside. Reheat couscous in microwave – then stir in onion, mint, lemon and lastly cucumber. Serve fish on the side with fresh squeezed lemon. Couscous Cucumber Salad "

        },
        {
            primary: 'Thai Beef Salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'lean steak': '6 oz'},
                {'baby cos lettuce' : '100g'},
                {'corriander & mint': '0.5 cup'},
                {'bean sprout': '0.5 cup'},
                {'tomato': '0.5 cup'},
                {'sliced cucumber': '0.5'},
                {'red onion': '0.5'},
                {'fresh lime': '1 tsp'},
                {'braggs liquid amino': 'drizzle'},
                {'chilli flakes': '1 tsp'}
            ],
            directions: "Marinate steak in soy sauce, fish sauce & 1 tbsp lime juice. Cook steak for 2-3 minutes per side until cooked to desired texture. Set aside. Place the tomato, bean sprouts, cucumber, onion, chili, mint, coriander, lime juice in a bowl and mix well. Thinly slice steak across the grain and add atop the vegetable mix."
        },
        {
            primary: 'Turkey Sandwich',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients: [
                {'egg white': '0.25 cup'},
                {'Keto bread': ' 2 slices'},
                {'provolone': '1 slice'},
                {'turkey breast': '6 slices'},
                {'tomato': '0.25'},
                {'avocado spread': '23g'}
            ],
            directions: "stack it up"
        },
    ],
    dinner:[
        {
            primary: 'Spicy Thai Shrimp Salad',
            secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
            person: '/static/images/avatar/5.jpg',
            ingredients:[
                {'jumbo shrimp': '6 oz'},
                {'lime juice': '1 tsp'},
                {'fish sauce': '1 tsp'},
                {'stevia': '2 packets'},
                {'crushed red pepper': '0.5 tsp'},
                {'mixed vegies': '0.75 cups'}
            ],
            directions:"Whisk lime juice, fish sauce, stevia and crushed red pepper in a large bowl (add a splash of water if too thick). Add shrimp, veggies and fresh herbs if desired. Toss to coat."
        },
        {
            primary: 'Thai Peanut Chicken',
            secondary: `Do you have a suggestion for a good present for John on his work
                anniversary. I am really confused & would love your thoughts on it.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'chicken breast':'6 oz'},
                {'brussel sprouts':'1 cup'},
                {'garlic powder':'0.25 tsp'},
                {'lemon juice': '1 tbsp'}
            ],
            direction:"Preheat oven to 425 degrees Fahrenheit. Spray brussels sprouts lightly with Pam, add garlic powder and salt to taste. Heat skillet for chicken and turn on medium- high, spray with Pam, and then fry thinly sliced chicken breast. Allow the sides to get crispy, once they are done add in the brussels sprouts and continue to sauté at a medium-low heat while adding the lemon juice."
        },
        {
            primary: 'Crispy Chicken with Brussel sprouts',
            secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
            person: '/static/images/avatar/2.jpg',
            ingredients:[
                {'chicken breast':'6 oz'},
                {'brussel sprouts':'1 cup'},
                {'garlic powder':'0.25 tsp'},
                {'lemon juice': '1 tbsp'}
            ],
            direction:"Preheat oven to 425 degrees Fahrenheit. Spray brussels sprouts lightly with Pam, add garlic powder and salt to taste. Heat skillet for chicken and turn on medium- high, spray with Pam, and then fry thinly sliced chicken breast. Allow the sides to get crispy, once they are done add in the brussels sprouts and continue to sauté at a medium-low heat while adding the lemon juice."
        },
        {
            primary: 'Seared Scallops with Sprouts',
            secondary: 'I have the tickets to the ReactConf for this year.',
            person: '/static/images/avatar/3.jpg',
            ingredients:[
                {'scallops':'6 oz'},
                {'brussel sprouts':'1 cup'},
                {'sauerkraut':'0.5 cup'},
                {'vinegar':'2 tbsp'}
            ],
            directions:'Heat skillet over medium-high heat and spray with Pam. Add scallops and brussel sprouts, season with salt and pepper, and cook – continuously stirring for about 5-6 minutes. Stir in vinegar, scraping up any brown bits, then transfer to a plate and set aside.'
        },
        {
            primary: "Lean stuffed peppers",
            secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
            person: '/static/images/avatar/4.jpg',
            ingredients:[
                {'ground turkey':'6 oz'},
                {'green bell pepper': '1'},
                {'onion': '0.25 cup'},
                {'minced garlic':'0.5 tbsp'},
                {'diced tomato': '0.3 cups'},
                {'parsley':'1 tsp'},
                {'oregano':'0.5 tsp'},
                {'basil':'0.5 tsp'},
                {'rosemary': '0.5 tsp'},
                {'salt':'1 tsp'}
            ],
            directions: "Preheat oven to 350 degrees Farenheit. Heat skillet, once hot, spray with Pam. Add all veggies and spices to skillet and cook for 5-10 minutes, until vegetables are tender. Add in turkey when veggies are done. Set pepper (seeded) on tray and cut in half, fill each half with meat mixture. Bake at 350 degrees Fahrenheit for about 25-30 minutes."
        },
        {
            primary: 'Lemon Asparagus sautee',
            secondary: `Menus that are generated by the bottom app bar (such as a bottom
                navigation drawer or overflow menu) open as bottom sheets at a higher elevation
                than the bar.`,
            person: '/static/images/avatar/5.jpg',
            ingredients:[
                {'asparagus': '15 stalks'},
                {'white fish': '6 oz'},
                {'lemon juice': '1 tbsp'},
            ],
            directions: 'Sauté the asparagus in skillet sprayed with Pam. When the asparagus slices are tender drizzle lemon juice on top. Move asparagus to side of skillet and spray again with Pam, turn heat to medium- high. Add fish to skillet and cool about 2-3 minutes per side until crisp. Add salt to taste, remove and plate!'
        },
        {
            primary: 'Holiday Comfort',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'baked turkey breast': '6 oz'},
                {'chopped cauliflower': '2 cups'},
                {'minced garlic': '0.5 tbsp'},
                {'italian seasoning': '0.5 tsp'},
                {'salt': '0.25 tsp'},
                {'black pepper':'pinch'},
                {'green onion': '1 stalk'},
                {'kerry gold butter': '2 tbsp'},
            ],
            directions:"In a small pot, bring about 1 cup of water to a simmer in a pot, then add the cauliflower. Cover and turn the heat to medium. Cook the cauliflower for 12-15 minutes or until very tender. Drain and discard all of the water and add the butter, spices, salt and pepper, mash with a masher until it looks like \"mashed potatoes\". Top with chives and pair with baked turkey."
        },
        {
            primary: 'Lemon and Almond Salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'chicken breast': '4 oz'},
                {'plain greek yogurt': '0.35 cups'},
                {'sliced lemons': '1.5 '},
                {'lemon juice': '1 tbsp'},
                {'green onion diced':'1'},
                {'chopped parsley': '1 tbsp'},
                {'lemon pepper seasoning': '1 tbsp'},
                {'salt': '1 tsp'}
            ],
            directions:'Preheat the oven to 400 degrees Farenheit. Cover chicken with all the seasoning and put in the oven for 20-25 minutes until cooked through. Heat nonstick skillet over medium-high heat, spray with Pam and add almonds. Heat over medium-low heat, stirring constantly, until the almonds toast and get golden brown and fragrant. After about 4-5 minutes remove the almonds and let them cool. Place the chicken, almonds, lemon juice, green onions and parsley in a bowl, stir to combine. Fold in the yogurt, stirring until the entire bowl of chicken is moistened. Season with more salt and pepper if desired.'
        },
        {
            primary: 'Low card broccoli and Tuna salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'broccoli':'6 cups'},
                {'Chopped Onions':'0.3 cup'},
                {'greek yogurt': '1 cup'},
                {'chopped almonds':'0.5 cups'},
                {'red vinegar':'2 tbsp'},
                {'canned tuna':'1.5'},
                {'salt':'dash'},
                {'pepper':'dash'},
                {'lemon pepper':'1 tsp'},
                {'green onion':'1'}
            ],
            directions:'In a large bowl combine broccoli, tuna, onion, and almonds. In a separate bowl, mix yogurt, vinegar, and seasonings, in a small bowl. Pour dressing over broccoli mixture and stir until evenly distributed. Cover and refrigerate for about an hour until ready to serve.'
        },
        {
            primary: 'Shrimp and avocado Salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'large avocados':'3'},
                {'small cooked shrimp':'35 oz'},
                {'greek yogurt':'2 tbsp'},
                {'lime juice':'2 tbsp'},
                {'siracha': '1 tbsp'},
                {'salt':'dash'},
                {'pepper':'dash'}
            ],
            directions:'Cut avocados in half lengthwise and remove pit. Cut flesh into chunks and use a spoon to scoop flesh out into a medium bowl. Add shrimp, yogurt, lime juice, siracha or hot sauce, and salt and pepper to taste. Toss to combine and separate into servings. Can serve inside of empty skin if desired.'
        },
        {
            primary: 'Honey Mustard Chicken Salad',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'chicken breast': '6 oz'},
                {'spinach': '1 bag'},
                {'tomatoes': '2'},
                {'red onion': '3 cup'},
                {'mustard':'0.3 cup'},
                {'stevia':'4 packets'},
                {'apple cider':'8 tbsp'}
            ],
            directions:'Put mustard, vinegar & stevia together in small bowl and whisk until thoroughly combined. Pour dressing over spinach, onion, tomato and chicken. Serve cold with chicken heated.'
        },
        {
            primary: 'Letuce Burger',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
                for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
            ingredients:[
                {'chicken breast': '6 oz'},
                {'spinach': '1 bag'},
                {'tomatoes': '2'},
                {'red onion': '3 cup'},
                {'mustard':'0.3 cup'},
                {'stevia':'4 packets'},
                {'apple cider':'8 tbsp'}
            ],
            directions:'Put mustard, vinegar & stevia together in small bowl and whisk until thoroughly combined. Pour dressing over spinach, onion, tomato and chicken. Serve cold with chicken heated.'
        },
    ]
}