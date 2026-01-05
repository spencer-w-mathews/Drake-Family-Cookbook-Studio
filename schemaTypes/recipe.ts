import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipes',
  type: 'document',
  description: 'Step-by-step recipes the family can add without any tech know-how.',
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe name',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description: 'Auto-filled from the name so links are easy to share.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Story or quick note',
      type: 'text',
      rows: 3,
      description: 'What makes this recipe special? Mention when to serve it or who loves it.',
    }),
    defineField({
      name: 'familyMember',
      title: 'Shared by',
      type: 'string',
      description: 'Who added or perfected this recipe?',
    }),
    defineField({
      name: 'heroImage',
      title: 'Dish photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description for screen readers and when the image cannot load.',
        }),
      ],
    }),
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      validation: (rule) => rule.min(1).max(48),
    }),
    defineField({
      name: 'prepTime',
      title: 'Prep time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(0).max(12 * 60),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(0).max(12 * 60),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Weeknight-friendly', value: 'weeknight'},
          {title: 'Showstopper', value: 'showstopper'},
        ],
        layout: 'radio',
      },
      initialValue: 'easy',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description: 'Examples: breakfast, Sunday dinner, kid-favorite, quick, vegetarian.',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'string',
              description: 'e.g. 1, 1 1/2, or a pinch',
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              options: {
                list: [
                  'cup',
                  'tbsp',
                  'tsp',
                  'ounce',
                  'pound',
                  'clove',
                  'pinch',
                  'slice',
                  'can',
                  'package',
                ],
              },
            }),
            defineField({
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'Any prep notes or substitutions.',
            }),
          ],
          preview: {
            select: {
              title: 'item',
              subtitle: 'note',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error('Add at least one ingredient.'),
    }),
    defineField({
      name: 'instructions',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 2,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.min(1).error('List the steps to make this recipe.'),
      description: 'Keep each step short and friendly; the site will number them automatically.',
    }),
    defineField({
      name: 'tips',
      title: 'Family tips',
      type: 'text',
      rows: 2,
      description: 'Serving suggestions, add-ahead notes, or family traditions.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'familyMember',
      media: 'heroImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? `Shared by ${subtitle}` : 'Drake Family recipe',
        media,
      }
    },
  },
})
