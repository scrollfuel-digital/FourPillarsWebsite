import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api.ts";
import { useToast } from "../../context/ToastContext.tsx";
import { Inquiry, ContactSubmission, Project } from "../../types.ts";
import { AdminProfile } from "../../types.ts";
import {
  DEFAULT_BRAND,
  DEFAULT_ADMIN_PROFILE,
  ADMIN_PROFILE_STORAGE_KEY,
} from "../../config/adminConfig.ts";

import AdminHeader from "../../components/admins/AdminHeader.tsx";
import AdminProfileModal from "../../components/admins/AdminProfileModal.tsx";
import StatsCards from "../../components/admins/StatsCards.tsx";
import AdminToolbar from "../../components/admins/AdminToolbar.tsx";
import InquiriesTable from "../../components/admins/InquiriesTable.tsx";
import ContactsTable from "../../components/admins/ContactsTable.tsx";
import ProjectsSection from "../../components/admins/ProjectsSection.tsx";
import ViewDetailsModal from "../../components/admins/ViewDetailsModal.tsx";
import DeleteConfirmModal from "../../components/admins/DeleteConfirmModal.tsx";
import ProjectFormModal, {
  ProjectFormState,
} from "../../components/admins/ProjectFormModal.tsx";
import { RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

type TabType = "inquiries" | "contacts" | "projects";

const EMPTY_PROJECT_FORM: ProjectFormState = {
  name: "",
  slug: "",
  type: "plot",
  status: "ongoing",
  location: "",
  description: "",
  details: "",
  specs: [],
  priceRange: "₹20 Lakh onward",
  acres: "5",
  totalUnits: "50",
  image: "",
  gallery: [],
  coordinate: { x: 50, y: 50 },
  mapHotspot: "",
  phone: "+91 93732 33777",
  highlights: "NMRDA Sanctioned RL, Prime Corridor, 24/7 Security",
  amenities: "Wide Paved Roads, Water Supply, Street Lights, Garden",
};

function loadStoredProfile(): AdminProfile {
  try {
    const raw = localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
    return raw
      ? { ...DEFAULT_ADMIN_PROFILE, ...JSON.parse(raw) }
      : DEFAULT_ADMIN_PROFILE;
  } catch {
    return DEFAULT_ADMIN_PROFILE;
  }
}

export default function AdminView() {
  const { toast } = useToast();
  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("inquiries");

  // Data states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchField, setSearchField] = useState<"all" | "name" | "email">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Modals state
  const [selectedItem, setSelectedItem] = useState<{
    type: TabType;
    data: any;
  } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: TabType;
    id: string;
    title: string;
  } | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(EMPTY_PROJECT_FORM);

  // Admin profile & branding — swap DEFAULT_BRAND / DEFAULT_ADMIN_PROFILE in
  // src/config/adminConfig.ts to rebrand, or wire loadStoredProfile()/onSave
  // below to a real /admin/profile API endpoint.
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const stored = loadStoredProfile();
    return {
      ...stored,
      name: authUser?.name || stored.name,
      email: authUser?.email || stored.email,
    };
  });
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (authUser) {
      setAdminProfile((prev) => ({
        ...prev,
        name: authUser.name,
        email: authUser.email,
      }));
    }
  }, [authUser]);

  const handleSaveProfile = (profile: AdminProfile) => {
    setAdminProfile(profile);
    try {
      localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    toast.success("Admin profile updated");
  };

  // Fetch all collections
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [inqRes, cntRes, prjRes]: any[] = await Promise.allSettled([
        api.get("/admin/inquiries"),
        api.get("/admin/contacts"),
        api.get("/admin/projects"),
      ]);

      if (inqRes.status === "fulfilled" && inqRes.value?.data)
        setInquiries(inqRes.value.data);
      if (cntRes.status === "fulfilled" && cntRes.value?.data)
        setContacts(cntRes.value.data);
      if (prjRes.status === "fulfilled" && prjRes.value?.data)
        setProjects(prjRes.value.data);
    } catch (err: any) {
      toast.error("Error loading admin data collections.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  /* ================= INQUIRY STATUS & DELETE ================= */
  const handleInquiryStatusChange = async (id: string, newStatus: string) => {
    try {
      const response: any = await api.patch(`/admin/inquiries/${id}`, {
        status: newStatus,
      });
      if (response.success) {
        setInquiries((prev) =>
          prev.map((i) =>
            (i._id || i.id) === id ? { ...i, status: newStatus } : i,
          ),
        );
        toast.success(`Inquiry status updated to ${newStatus}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update inquiry status");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const response: any = await api.delete(`/admin/inquiries/${id}`);
      if (response.success) {
        setInquiries((prev) => prev.filter((i) => (i._id || i.id) !== id));
        toast.success("Inquiry record deleted.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete inquiry");
    } finally {
      setDeleteConfirmation(null);
    }
  };

  /* ================= CONTACT STATUS & DELETE ================= */
  const handleContactStatusChange = async (id: string, newStatus: string) => {
    try {
      const response: any = await api.patch(`/admin/contacts/${id}`, {
        status: newStatus,
      });
      if (response.success) {
        setContacts((prev) =>
          prev.map((c) =>
            (c._id || c.id) === id ? { ...c, status: newStatus } : c,
          ),
        );
        toast.success(`Contact status updated to ${newStatus}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update contact status");
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const response: any = await api.delete(`/admin/contacts/${id}`);
      if (response.success) {
        setContacts((prev) => prev.filter((c) => (c._id || c.id) !== id));
        toast.success("Contact entry deleted.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete contact message");
    } finally {
      setDeleteConfirmation(null);
    }
  };

  /* ================= PROJECT CREATE / EDIT / DELETE ================= */
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      ...EMPTY_PROJECT_FORM,
      location: "Nagpur, Maharashtra",
      priceRange: "₹25 Lakh onward",
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (projectItem: Project) => {
    setEditingProject(projectItem);
    setProjectForm({
      name: projectItem.name,
      slug: projectItem.slug || projectItem.id || "",
      type: projectItem.type,
      status: projectItem.status || "ongoing",
      location: projectItem.location,
      description: projectItem.description,
      details: (projectItem.details || []).join("\n"),
      specs: projectItem.specs || [],
      highlights: (projectItem.highlights || []).join(", "),
      amenities: (projectItem.amenities || []).join(", "),
      priceRange: projectItem.priceRange,
      acres: projectItem.acres || "4",
      totalUnits: projectItem.totalUnits || "50",
      image: projectItem.image || "/images/project_melbourne_png_1780484693295.png",
      gallery: projectItem.gallery || [],
      coordinate: projectItem.coordinate || { x: 50, y: 50 },
      mapHotspot: projectItem.mapHotspot || "",
      phone: projectItem.phone || "+91 93732 33777",
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!projectForm.name || !projectForm.location) {
      toast.error("Project Name and Location are required.");
      return;
    }

    const payload = {
      ...projectForm,
      details: projectForm.details
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: projectForm.highlights
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      amenities: projectForm.amenities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingProject) {
        const response: any = await api.put(
          `/admin/projects/${editingProject.slug || editingProject.id}`,
          payload,
        );
        if (response.success && response.data) {
          setProjects((prev) =>
            prev.map((p) =>
              (p.slug || p.id) === (editingProject.slug || editingProject.id)
                ? response.data
                : p,
            ),
          );
          toast.success("Project details updated successfully.");
        }
      } else {
        const response: any = await api.post("/admin/projects", payload);
        if (response.success && response.data) {
          setProjects((prev) => [response.data, ...prev]);
          toast.success("New project published successfully.");
        }
      }
      setProjectModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error saving project.");
    }
  };

  const handleDeleteProject = async (slugOrId: string) => {
    try {
      const response: any = await api.delete(`/admin/projects/${slugOrId}`);
      if (response.success) {
        setProjects((prev) =>
          prev.filter((p) => p.slug !== slugOrId && p.id !== slugOrId),
        );
        toast.success("Project deleted from catalog.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project.");
    } finally {
      setDeleteConfirmation(null);
    }
  };

  const handleConfirmDelete = (type: TabType, id: string) => {
    if (type === "inquiries") handleDeleteInquiry(id);
    else if (type === "contacts") handleDeleteContact(id);
    else if (type === "projects") handleDeleteProject(id);
  };

  /* ================= EXPORT TO CSV ================= */
  const exportToCSV = () => {
    const filename = `${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`;
    let csvRows: string[] = [];

    if (activeTab === "inquiries") {
      csvRows.push("ID,Name,Email,Phone,Project,Status,Date,Message");
      filteredInquiries.forEach((inquiry) => {
        csvRows.push(
          `"${inquiry._id || inquiry.id || ""}","${inquiry.fullName || inquiry.name || ""}","${inquiry.email}","${inquiry.phone}","${inquiry.project || inquiry.projectSlug || ""}","${inquiry.status || "New"}","${inquiry.createdAt || inquiry.dateCreated || ""}","${(inquiry.message || "").replace(/"/g, '""')}"`,
        );
      });
    } else if (activeTab === "contacts") {
      csvRows.push("ID,Name,Email,Phone,Subject,Status,Date,Message");
      filteredContacts.forEach((contact) => {
        csvRows.push(
          `"${contact._id || contact.id || ""}","${contact.name}","${contact.email}","${contact.phone || ""}","${contact.subject || ""}","${contact.status || "New"}","${contact.createdAt || ""}","${(contact.message || "").replace(/"/g, '""')}"`,
        );
      });
    } else {
      csvRows.push("ID,Slug,Name,Type,Location,PriceRange,Acres,TotalUnits");
      filteredProjects.forEach((projectItem) => {
        csvRows.push(
          `"${projectItem.id}","${projectItem.slug}","${projectItem.name}","${projectItem.type}","${projectItem.location}","${projectItem.priceRange}","${projectItem.acres || ""}","${projectItem.totalUnits || ""}"`,
        );
      });
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const blobUrl = window.URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = filename;
    downloadAnchor.click();
    window.URL.revokeObjectURL(blobUrl);
    toast.info(`Exported ${activeTab} to CSV`);
  };

  /* ================= FILTERED DATA ================= */
  const filteredInquiries = inquiries.filter((inquiry) => {
    const term = searchTerm.trim().toLowerCase();
    let matchSearch = true;
    if (term) {
      const nameMatch = (inquiry.fullName || inquiry.name || "")
        .toLowerCase()
        .includes(term);
      const emailMatch = (inquiry.email || "").toLowerCase().includes(term);
      const phoneMatch = (inquiry.phone || "").includes(term);
      const projectMatch = (inquiry.project || inquiry.projectSlug || "")
        .toLowerCase()
        .includes(term);
      const messageMatch = (inquiry.message || "").toLowerCase().includes(term);
      if (searchField === "name") matchSearch = nameMatch;
      else if (searchField === "email") matchSearch = emailMatch;
      else
        matchSearch =
          nameMatch || emailMatch || phoneMatch || projectMatch || messageMatch;
    }
    const matchStatus =
      statusFilter === "all" ||
      (inquiry.status || "New").toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.trim().toLowerCase();
    let matchSearch = true;
    if (term) {
      const nameMatch = (contact.name || "").toLowerCase().includes(term);
      const emailMatch = (contact.email || "").toLowerCase().includes(term);
      const phoneMatch = (contact.phone || "").includes(term);
      const subjectMatch = (contact.subject || "").toLowerCase().includes(term);
      const messageMatch = (contact.message || "").toLowerCase().includes(term);
      if (searchField === "name") matchSearch = nameMatch;
      else if (searchField === "email") matchSearch = emailMatch;
      else
        matchSearch =
          nameMatch || emailMatch || phoneMatch || subjectMatch || messageMatch;
    }
    const matchStatus =
      statusFilter === "all" ||
      (contact.status || "New").toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const filteredProjects = projects.filter((projectItem) => {
    const term = searchTerm.toLowerCase();
    return (
      projectItem.name.toLowerCase().includes(term) ||
      projectItem.location.toLowerCase().includes(term) ||
      projectItem.type.toLowerCase().includes(term) ||
      projectItem.description.toLowerCase().includes(term)
    );
  });

  const newInquiriesCount = inquiries.filter(
    (i) => !i.status || i.status.toLowerCase() === "new",
  ).length;
  const newContactsCount = contacts.filter(
    (c) => !c.status || c.status.toLowerCase() === "new",
  ).length;

  const filteredCount =
    activeTab === "inquiries"
      ? filteredInquiries.length
      : activeTab === "contacts"
        ? filteredContacts.length
        : filteredProjects.length;
  const totalCount =
    activeTab === "inquiries"
      ? inquiries.length
      : activeTab === "contacts"
        ? contacts.length
        : projects.length;

  const hasActiveFilters =
    Boolean(searchTerm) || statusFilter !== "all" || searchField !== "all";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      <Helmet>
        <title>Admin  | {DEFAULT_BRAND.companyName}</title>
        <meta
          name="description"
          content={`Admin management suite for ${DEFAULT_BRAND.companyName} lead inquiries, contact submissions, and project catalog.`}
        />
        <meta
          property="og:title"
          content={`Admin | ${DEFAULT_BRAND.companyName}`}
        />
        <meta
          property="og:description"
          content={`Admin management suite for ${DEFAULT_BRAND.companyName} lead inquiries, contact submissions, and project catalog.`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <AdminHeader
        brand={DEFAULT_BRAND}
        profile={adminProfile}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onExportCSV={exportToCSV}
        onNewProject={handleOpenCreateProject}
        onEditProfile={() => setProfileModalOpen(true)}
        onLogout={() => { logout(); navigate("/login"); }}
      />

      <StatsCards
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inquiriesCount={inquiries.length}
        contactsCount={contacts.length}
        projectsCount={projects.length}
        newInquiriesCount={newInquiriesCount}
        newContactsCount={newContactsCount}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <AdminToolbar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setStatusFilter("all");
          }}
          inquiriesCount={inquiries.length}
          contactsCount={contacts.length}
          projectsCount={projects.length}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          searchField={searchField}
          onSearchFieldChange={setSearchField}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filteredCount={filteredCount}
          totalCount={totalCount}
        />

        {loading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mx-auto mb-3" />
            <p className="text-xs font-semibold text-slate-400">
              Loading {activeTab} data...
            </p>
          </div>
        ) : (
          <div className="mt-4">
            {activeTab === "inquiries" && (
              <InquiriesTable
                inquiries={filteredInquiries}
                hasActiveFilters={hasActiveFilters}
                onStatusChange={handleInquiryStatusChange}
                onView={(inquiry) =>
                  setSelectedItem({ type: "inquiries", data: inquiry })
                }
                onDelete={(id, title) =>
                  setDeleteConfirmation({ type: "inquiries", id, title })
                }
              />
            )}

            {activeTab === "contacts" && (
              <ContactsTable
                contacts={filteredContacts}
                hasActiveFilters={hasActiveFilters}
                onStatusChange={handleContactStatusChange}
                onView={(contact) =>
                  setSelectedItem({ type: "contacts", data: contact })
                }
                onDelete={(id, title) =>
                  setDeleteConfirmation({ type: "contacts", id, title })
                }
              />
            )}

            {activeTab === "projects" && (
              <ProjectsSection
                projects={filteredProjects}
                viewMode={viewMode}
                onEdit={handleOpenEditProject}
                onDelete={(id, title) =>
                  setDeleteConfirmation({ type: "projects", id, title })
                }
                onCreateNew={handleOpenCreateProject}
              />
            )}
          </div>
        )}
      </div>

      <ViewDetailsModal
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <DeleteConfirmModal
        deleteConfirmation={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(null)}
        onConfirm={handleConfirmDelete}
      />

      <ProjectFormModal
        isOpen={projectModalOpen}
        editingProject={editingProject}
        form={projectForm}
        onFormChange={setProjectForm}
        onClose={() => setProjectModalOpen(false)}
        onSubmit={handleSaveProject}
      />

      <AdminProfileModal
        isOpen={profileModalOpen}
        profile={adminProfile}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
