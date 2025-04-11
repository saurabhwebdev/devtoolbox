import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We offer a range of services to meet your needs.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: [
      "Responsive design",
      "Interactive user interfaces",
      "Performance optimization",
      "SEO-friendly architecture"
    ]
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    features: [
      "iOS and Android development",
      "React Native expertise",
      "Offline capability",
      "Push notifications"
    ]
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, user-centered design solutions",
    features: [
      "User research",
      "Wireframing and prototyping",
      "Usability testing",
      "Design systems"
    ]
  },
  {
    title: "Consulting",
    description: "Expert advice on your technology challenges",
    features: [
      "Technical architecture",
      "Code reviews",
      "Performance audits",
      "Best practices guidance"
    ]
  },
  {
    title: "Maintenance",
    description: "Ongoing support for your digital products",
    features: [
      "Bug fixes",
      "Performance monitoring",
      "Security updates",
      "Feature enhancements"
    ]
  },
  {
    title: "Training",
    description: "Upskill your team with expert-led workshops",
    features: [
      "Custom curriculum",
      "Hands-on exercises",
      "One-on-one mentoring",
      "Follow-up support"
    ]
  }
]; 