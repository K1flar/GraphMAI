﻿// <auto-generated />
using GraphMAI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GraphMAI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GraphMAI.Models.GraphEdge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("From")
                        .HasColumnType("int");

                    b.Property<int>("GraphId")
                        .HasColumnType("int");

                    b.Property<int>("To")
                        .HasColumnType("int");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("GraphId");

                    b.ToTable("Edges", (string)null);
                });

            modelBuilder.Entity("GraphMAI.Models.GraphEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("GraphEntities", (string)null);
                });

            modelBuilder.Entity("GraphMAI.Models.GraphEdge", b =>
                {
                    b.HasOne("GraphMAI.Models.GraphEntity", "Graph")
                        .WithMany("Edges")
                        .HasForeignKey("GraphId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Graph");
                });

            modelBuilder.Entity("GraphMAI.Models.GraphEntity", b =>
                {
                    b.Navigation("Edges");
                });
#pragma warning restore 612, 618
        }
    }
}
