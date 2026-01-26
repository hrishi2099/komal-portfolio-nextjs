"use client";

import { useState } from "react";
import { updateHero, updateAbout, createProject, deleteProject, updateContact, updateProjectDetails, addProjectGalleryImage, deleteProjectGalleryImage } from "@/app/actions";
import { Trash2, Edit2, Plus, X, Upload } from "lucide-react";

type Props = {
  hero: any;
  about: any;
  projects: any[];
  contact: any;
};

export default function DashboardClient({ hero, about, projects, contact }: Props) {
  const [activeTab, setActiveTab] = useState("hero");
  const [editingProject, setEditingProject] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex space-x-4 mb-8 border-b dark:border-gray-800 pb-4 overflow-x-auto">
          {["hero", "about", "projects", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingProject(null); }}
              className={`px-4 py-2 rounded capitalize whitespace-nowrap ${
                activeTab === tab 
                  ? "bg-black text-white dark:bg-white dark:text-black" 
                  : "bg-gray-200 dark:bg-gray-800 hover:opacity-80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hero Form */}
        {activeTab === "hero" && (
          <form action={updateHero} className="space-y-6 max-w-xl">
            <h2 className="text-xl font-bold">Edit Hero Section</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input name="heading" defaultValue={hero?.heading} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <textarea name="subheading" defaultValue={hero?.subheading} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Background Image</label>
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden">
                    <img src={hero?.backgroundImage} alt="Current" className="w-full h-full object-cover" />
                 </div>
                 <input type="hidden" name="backgroundImage" value={hero?.backgroundImage} />
                 <input type="file" name="backgroundImageFile" className="text-sm" accept="image/*" />
              </div>
            </div>
            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded">Save Changes</button>
          </form>
        )}

        {/* About Form */}
        {activeTab === "about" && (
          <form action={updateAbout} className="space-y-6 max-w-xl">
            <h2 className="text-xl font-bold">Edit About Section</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Heading (Philosophy)</label>
              <input name="heading" defaultValue={about?.heading} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subheading (Quote)</label>
              <textarea name="subheading" defaultValue={about?.subheading} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea name="content" defaultValue={about?.content} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" rows={5} />
            </div>
             <div>
              <label className="block text-sm font-medium mb-1">Profile Image</label>
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                    <img src={about?.image} alt="Current" className="w-full h-full object-cover" />
                 </div>
                 <input type="hidden" name="image" value={about?.image} />
                 <input type="file" name="imageFile" className="text-sm" accept="image/*" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-1">Profile Name</label>
                   <input name="profileName" defaultValue={about?.profileName} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Profile Title</label>
                   <input name="profileTitle" defaultValue={about?.profileTitle} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                </div>
            </div>
            <div className="flex gap-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Years Exp</label>
                  <input name="yearsExp" defaultValue={about?.yearsExp} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Projects Count</label>
                  <input name="projectsCount" defaultValue={about?.projectsCount} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
               </div>
            </div>
            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded">Save Changes</button>
          </form>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
             {editingProject ? (
                // EDIT MODE
                <div>
                    <button onClick={() => setEditingProject(null)} className="mb-6 text-sm underline text-gray-500 hover:text-black dark:hover:text-white">
                        &larr; Back to Projects
                    </button>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Project Details Form */}
                        <form action={updateProjectDetails} className="space-y-6">
                            <h2 className="text-xl font-bold">Edit Project: {editingProject.title}</h2>
                            <input type="hidden" name="id" value={editingProject.id} />
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input name="title" defaultValue={editingProject.title} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input name="category" defaultValue={editingProject.category} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Cover Image</label>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden">
                                        <img src={editingProject.image} alt="Current" className="w-full h-full object-cover" />
                                    </div>
                                    <input type="hidden" name="image" value={editingProject.image} />
                                    <input type="file" name="imageFile" className="text-sm" accept="image/*" />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea name="description" defaultValue={editingProject.description || ""} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" rows={6} />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Year</label>
                                    <input name="year" defaultValue={editingProject.year || ""} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input name="location" defaultValue={editingProject.location || ""} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Area</label>
                                    <input name="area" defaultValue={editingProject.area || ""} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
                                </div>
                            </div>
                            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded">Update Project Details</button>
                        </form>

                        {/* Gallery Management */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Gallery Images</h3>
                            
                            {/* Add Image */}
                            <form action={addProjectGalleryImage} className="flex gap-2 mb-6 items-end">
                                <input type="hidden" name="projectId" value={editingProject.id} />
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Upload Image</label>
                                    <input type="file" name="file" className="block w-full text-sm border p-2 rounded" accept="image/*" required />
                                </div>
                                <button type="submit" className="bg-black text-white dark:bg-white dark:text-black p-2 rounded hover:opacity-80 h-[38px] flex items-center justify-center w-10">
                                    <Plus size={20} />
                                </button>
                            </form>

                            <div className="grid grid-cols-2 gap-4">
                                {editingProject.gallery && editingProject.gallery.map((img: any) => (
                                    <div key={img.id} className="relative group">
                                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                                            <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                                        </div>
                                        <button 
                                            onClick={() => deleteProjectGalleryImage(img.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
             ) : (
                // LIST MODE
                <div>
                    <h2 className="text-xl font-bold mb-6">Manage Projects</h2>
                    
                    {/* Add Project */}
                    <form action={createProject} className="mb-10 p-6 border dark:border-gray-800 rounded bg-gray-50 dark:bg-gray-900">
                        <h3 className="font-bold mb-4">Add New Project</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input name="title" placeholder="Project Title" className="border p-2 rounded bg-transparent dark:border-gray-700" required />
                            <input name="category" placeholder="Category" className="border p-2 rounded bg-transparent dark:border-gray-700" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-500">Cover Image</label>
                            <input type="file" name="imageFile" className="text-sm" accept="image/*" required />
                        </div>
                        <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm">Create Project</button>
                    </form>

                    {/* List Projects */}
                    <div className="space-y-4">
                        {projects.map((p) => (
                            <div key={p.id} className="flex items-center justify-between p-4 border dark:border-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{p.title}</h4>
                                        <p className="text-sm text-gray-500">{p.category}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setEditingProject(p)}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
                                        title="Edit Details"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button 
                                        onClick={() => deleteProject(p.id)}
                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded"
                                        title="Delete Project"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}
          </div>
        )}

        {/* Contact Form */}
        {activeTab === "contact" && (
          <form action={updateContact} className="space-y-6 max-w-xl">
            <h2 className="text-xl font-bold">Edit Contact Section</h2>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Heading</label>
              <input name="ctaText" defaultValue={contact?.ctaText} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Subtext</label>
              <input name="ctaSub" defaultValue={contact?.ctaSub} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" defaultValue={contact?.email} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" defaultValue={contact?.phone} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea name="address" defaultValue={contact?.address} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" rows={3} />
            </div>
            
            <h3 className="text-lg font-bold pt-4 border-t dark:border-gray-800 mt-6">Social Media Links</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <input name="instagram" defaultValue={contact?.instagram} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input name="linkedin" defaultValue={contact?.linkedin} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Behance URL</label>
              <input name="behance" defaultValue={contact?.behance} className="w-full border p-2 rounded bg-transparent dark:border-gray-700" />
            </div>

            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}