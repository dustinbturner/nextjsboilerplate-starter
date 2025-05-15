"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { uploadDocument } from "@/app/actions"
import { toast } from "@/hooks/use-toast"

export function DocumentUpload() {
  const [documentType, setDocumentType] = useState<"resume" | "cover-letter">("resume")
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]

      // Check file type
      const fileType = file.name.split(".").pop()?.toLowerCase()
      if (fileType !== "pdf" && fileType !== "docx") {
        toast({
          title: "Invalid file format",
          description: "Only PDF and DOCX files are allowed",
          variant: "destructive",
        })
        return
      }

      setIsUploading(true)

      try {
        // In a real app, you would upload the file to a server or storage service
        await uploadDocument(file, documentType)

        toast({
          title: "Document uploaded",
          description: `Your ${documentType} has been uploaded successfully.`,
        })
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your document.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    },
    [documentType],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground">Upload your resume or cover letter in PDF or DOCX format.</p>
          </div>

          <RadioGroup
            value={documentType}
            onValueChange={(value) => setDocumentType(value as "resume" | "cover-letter")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="resume" id="resume" />
              <Label htmlFor="resume">Resume</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cover-letter" id="cover-letter" />
              <Label htmlFor="cover-letter">Cover Letter</Label>
            </div>
          </RadioGroup>

          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div>
                {isDragActive ? (
                  <p className="text-primary font-medium">Drop your file here</p>
                ) : (
                  <>
                    <p className="font-medium">Drag and drop your file here or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-1">Supports PDF, DOCX (max 10MB)</p>
                  </>
                )}
              </div>
              <Button variant="outline" disabled={isUploading}>
                <FileUp className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Select File"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
