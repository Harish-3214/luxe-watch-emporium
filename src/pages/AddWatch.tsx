import { useState } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addWatch } from '@/api/watchService'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  brand: string
  model: string
  price: string
  rating: string
  image: string
  description: string
  stock: string
}

interface FormErrors {
  [key: string]: string
}

export function AddWatch() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    brand: '',
    model: '',
    price: '',
    rating: '',
    image: '',
    description: '',
    stock: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required'
    if (!formData.model.trim()) newErrors.model = 'Model is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'

    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }

    if (!formData.rating) {
      newErrors.rating = 'Rating is required'
    } else if (isNaN(parseFloat(formData.rating)) || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock is required'
    } else if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative integer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'image') {
      try {
        new URL(value)
        setImagePreview(value)
      } catch (err) {
        setImagePreview('')
      }
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const watchData = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        image: formData.image.trim(),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
      }

      const result = await addWatch(watchData)

      if (result.success) {
        setSuccessMessage('Watch added successfully! 🎉')
        setFormData({
          name: '',
          brand: '',
          model: '',
          price: '',
          rating: '',
          image: '',
          description: '',
          stock: '',
        })
        setImagePreview('')
        setTimeout(() => setSuccessMessage(''), 5000)
      } else {
        setErrorMessage(result.error || 'Failed to add watch. Please try again.')
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <section className="container mx-auto max-w-2xl px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Admin Panel</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Add New Watch</h1>
          <p className="mt-4 text-muted-foreground">Create a new luxury watch product in the collection</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-luxe">
          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-900/20 border border-green-700/50 p-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-green-400">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-900/20 border border-red-700/50 p-4">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-400">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Meridian Classic"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="brand" className="text-muted-foreground">Brand *</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Rolex"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.brand ? 'border-red-500' : ''}`}
                />
                {errors.brand && <p className="mt-1 text-sm text-red-400">{errors.brand}</p>}
              </div>

              <div>
                <Label htmlFor="model" className="text-muted-foreground">Model *</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Submariner 41"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.model ? 'border-red-500' : ''}`}
                />
                {errors.model && <p className="mt-1 text-sm text-red-400">{errors.model}</p>}
              </div>

              <div>
                <Label htmlFor="price" className="text-muted-foreground">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5999.99"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.price ? 'border-red-500' : ''}`}
                />
                {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="rating" className="text-muted-foreground">Rating (0-5) *</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g., 4.8"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.rating ? 'border-red-500' : ''}`}
                />
                {errors.rating && <p className="mt-1 text-sm text-red-400">{errors.rating}</p>}
              </div>

              <div>
                <Label htmlFor="stock" className="text-muted-foreground">Stock Quantity *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g., 15"
                  className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.stock ? 'border-red-500' : ''}`}
                />
                {errors.stock && <p className="mt-1 text-sm text-red-400">{errors.stock}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="image" className="text-muted-foreground">Image URL *</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="e.g., https://images.unsplash.com/..."
                className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}

              {imagePreview && (
                <div className="mt-4 rounded-lg overflow-hidden border border-border/60 bg-secondary/30">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                  <p className="p-2 text-xs text-muted-foreground">Image preview</p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-muted-foreground">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the watch features, movement, materials, etc..."
                rows={5}
                className={`mt-2 border-border/60 bg-secondary/50 focus:border-primary/60 resize-none ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
            </div>

            <div className="pt-6 flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-gold text-primary-foreground shadow-glow hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Watch'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary/40"
                onClick={() => {
                  setFormData({
                    name: '',
                    brand: '',
                    model: '',
                    price: '',
                    rating: '',
                    image: '',
                    description: '',
                    stock: '',
                  })
                  setImagePreview('')
                  setErrors({})
                  setSuccessMessage('')
                  setErrorMessage('')
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}
