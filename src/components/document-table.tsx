"use client"

import { useState } from "react"
import { Download, FileEdit, Trash2, Brain, Search, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDocuments = [
  {
    id: "1",
    name: "Resume_2023.pdf",
    type: "resume",
    uploadDate: new Date("2023-05-10"),
    lastEditedDate: new Date("2023-05-12"),
  },
  {
    id: "2",
    name: "Cover_Letter_Company_XYZ.docx",
    type: "cover-letter",
    uploadDate: new Date("2023-05-08"),
    lastEditedDate: new Date("2023-05-08"),
  },
  {
    id: "3",
    name: "Technical_Resume_2023.pdf",
    type: "resume",
    uploadDate: new Date("2023-05-05"),
    lastEditedDate: new Date("2023-05-07"),
  },
  {
    id: "4",
    name: "Cover_Letter_Startup.pdf",
    type: "cover-letter",
    uploadDate: new Date("2023-04-28"),
    lastEditedDate: new Date("2023-05-01"),
  },
  {
    id: "5",
    name: "Resume_Draft.docx",
    type: "resume",
    uploadDate: new Date("2023-04-20"),
    lastEditedDate: new Date("2023-04-25"),
  },
]

type SortField = "name" | "uploadDate" | "lastEditedDate"
type SortDirection = "asc" | "desc"

interface DocumentTableProps {
  filter: "all" | "resume" | "cover-letter"
}

export function DocumentTable({ filter }: DocumentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("uploadDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null)

  // Filter documents based on type and search term
  const filteredDocuments = mockDocuments
    .filter((doc) => {
      if (filter === "all") return true
      return doc.type === filter
    })
    .filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else {
        const dateA = a[sortField].getTime()
        const dateB = b[sortField].getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      }
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const handleDownload = (id: string) => {
    // In a real app, this would trigger a download
    toast({
      title: "Download started",
      description: "Your document is being downloaded.",
    })
  }

  const handleAnalyze = (id: string) => {
    toast({
      title: "AI Analysis",
      description: "Starting AI analysis of your document...",
    })
  }

  const handleEdit = (id: string) => {
    toast({
      title: "Opening editor",
      description: "Opening document in editor...",
    })
  }

  const confirmDelete = (id: string) => {
    setDocumentToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (!documentToDelete) return

    // In a real app, this would delete the document
    toast({
      title: "Document deleted",
      description: "Your document has been deleted.",
    })

    setDeleteDialogOpen(false)
    setDocumentToDelete(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center space-x-1">
                  <span>Document Name</span>
                  {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("uploadDate")}>
                <div className="flex items-center space-x-1">
                  <span>Upload Date</span>
                  {getSortIcon("uploadDate")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastEditedDate")}>
                <div className="flex items-center space-x-1">
                  <span>Last Edited</span>
                  {getSortIcon("lastEditedDate")}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No documents found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">{document.name}</TableCell>
                  <TableCell>
                    <Badge variant={document.type === "resume" ? "default" : "secondary"}>
                      {document.type === "resume" ? "Resume" : "Cover Letter"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(document.uploadDate)}</TableCell>
                  <TableCell>{formatDate(document.lastEditedDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(document.id)} title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleAnalyze(document.id)} title="AI Analyze">
                        <Brain className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(document.id)}
                        title="Open in Editor"
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(document.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAnalyze(document.id)}>
                            <Brain className="mr-2 h-4 w-4" />
                            AI Analyze
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(document.id)}>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Open in Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => confirmDelete(document.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
